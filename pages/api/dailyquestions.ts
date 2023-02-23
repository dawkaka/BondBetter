import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { getCurrentDateAndTime, isMoreThan24Hours, nextQuestionsTime, parseDailyAnswers } from "../../lib/uitls"
import { authOptions } from "./auth/[...nextauth]"


export default async function dailyQuestoinsHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const { method } = req
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (method) {
        case 'GET':
            try {
                const user = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { sendRequest: true, recievedRequest: true, coupleID: true, partnerID: true, nextQuestionsTime: true } })
                if (!user) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                if (!user.coupleID) {
                    let t = user.sendRequest ? { t: user.sendRequest, m: "Sent" } : user.recievedRequest ? { t: user.recievedRequest, m: "Received" } : undefined
                    let partner
                    if (t) {
                        partner = await prisma.user.findUnique({ where: { email: t.t } })
                    }
                    return res.json({ type: t?.m || "None", partner })
                }
                const couple = await prisma.couple.findUnique({ where: { id: user.coupleID } })
                if (!couple) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                const now = getCurrentDateAndTime()

                if (user.nextQuestionsTime && !isMoreThan24Hours(user.nextQuestionsTime, now)) {
                    return res.json({ type: "Answered", next: user.nextQuestionsTime })
                }
                const partner = await prisma.user.findUnique({ where: { id: user.partnerID! } })
                if (!partner) {
                    return res.status(404).json({ message: "Something went wrong, try again." })
                }
                //Partner already answered, show questions partner answered
                if (partner.nextQuestionsTime && !isMoreThan24Hours(partner.nextQuestionsTime, now)) {
                    const questions = await prisma.questionBank.findMany({
                        where: {
                            id: {
                                in: await prisma.coupleAnswer.findMany({
                                    orderBy: {
                                        time: 'desc'
                                    },
                                    where: { userID: partner.id },
                                    take: 5
                                }).then(answers => answers.map(a => a.questionID))
                            }
                        }
                    })
                    return res.json(questions)
                }
                // Now answered for this day, how questions the both haven't answered
                const questions = await prisma.questionBank.findMany({
                    where: {
                        id: {
                            notIn: await prisma.coupleAnswer.findMany({
                                where: { coupleID: user.coupleID },
                                select: { questionID: true },
                            }).then(answers => answers.map(answer => answer.questionID))
                        }
                    },
                    take: 5
                });
                return res.json(questions)
            } catch (error) {
                res.status(500).json({ message: "Something went wrong" })
            }
            break;

        case 'POST':
            try {
                const user = await prisma.user.findUnique({
                    where: { email: session.user.email! },
                    select: { id: true, coupleID: true, partnerID: true, nextQuestionsTime: true }
                })
                if (!user) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                if (!user.coupleID) {
                    return res.status(401).json({ message: "You need a partner to answer daily questions with." })
                }
                const couple = await prisma.couple.findUnique({ where: { id: user.coupleID } })
                if (!couple) {
                    return res.status(401).json({ message: "You need a partner to answer daily questions with." })
                }
                const sTime = nextQuestionsTime(couple.startDate)
                const now = getCurrentDateAndTime()
                if (user.nextQuestionsTime && !isMoreThan24Hours(user.nextQuestionsTime, now)) {
                    return res.status(401).json({ message: "Can't not get answer questions now, try again later." })
                }
                const answeredQuestions = req.body.answers
                if (!Array.isArray(answeredQuestions)) {
                    return res.status(400).json({ message: "Something wrong with this request" })
                }
                if (answeredQuestions.length !== 5) {
                    return res.status(400).json({ message: "Answer five questions only, all are questions are required" })
                }
                const [errs, answers] = parseDailyAnswers(user.id, user.coupleID, answeredQuestions)
                if (errs.length > 0) {
                    return res.status(400).json({ type: "answerErrors", errors: errs })
                }

                const r = await prisma.$transaction([
                    prisma.coupleAnswer.createMany({ data: answers }),
                    prisma.user.update({ where: { id: user.id }, data: { nextQuestionsTime: sTime, timeOfLastAnswered: now, currentStreak: { increment: 1 } } })
                ])
                return res.json(r)
            } catch (error) {
                res.status(500).json({ message: "Something went wrong" })
            }
            break;
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}