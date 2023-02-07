import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { generateLink, getCurrentDate, getCurrentDateAndTime, isMoreThan24Hours } from "../../lib/uitls"
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
                const user = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { coupleID: true, partnerID: true, lastAnswered: true } })
                if (!user) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                if (!user.coupleID || !user.partnerID) {
                    return res.status(401).json({ message: "You need a partner to answer daily questions with." })
                }
                const couple = await prisma.couple.findUnique({ where: { id: user.coupleID } })
                if (!couple) {
                    return res.status(401).json({ message: "You need a partner to answer daily questions with." })
                }
                const now = getCurrentDateAndTime()
                if (user.lastAnswered && !isMoreThan24Hours(now, user.lastAnswered)) {
                    return res.status(401).json({ message: "Can't not get new questions now, come back later and check." })
                }
                const questions = await prisma.questionBank.findMany({
                    where: {
                        id: {
                            notIn: await prisma.coupleAnswer.findMany({
                                select: { questionID: true },
                                where: {}
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

        default:
            res.setHeader('Allow', ['POST', 'GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}