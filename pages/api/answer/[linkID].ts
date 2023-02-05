import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../../lib/prismadb"
import { mapQuestionsAndAnswers, validateAnswers } from "../../../lib/uitls"
import { authOptions } from "../auth/[...nextauth]"

export default async function AnswerHandler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req
    const linkID = Array.isArray(query) ? query[0].linkID : query.linkID
    switch (method) {
        case "GET":
            const session = await getServerSession(req, res, authOptions)
            if (!session) {
                return res.status(401).json({ message: "login required" })
            }
            const user = await prisma.user.findUnique({ where: { email: session?.user?.email! } })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            const QandA = await prisma.customAnswer.findMany({ where: { questionLinkID: linkID, questionBy: user.id } })
            res.status(200).json(QandA)
            break

        case "POST":
            try {
                const questionsOwner = await prisma.user.findFirst({ where: { currentLinkID: linkID } })
                if (!questionsOwner) {
                    return res.status(404).json({ message: "Cannot submit answers, link is not longer available or never existed" })
                }
                if (!Array.isArray(req.body.answers)) {
                    return res.status(400).json({ message: "Invalid answer format" });
                }
                if (req.body.answers.length > 25) {
                    return res.status(400).json({ message: "The number of answers cannot be more than 25" });
                }
                const questions = questionsOwner.questions as any[]
                const answers = req.body.answers.slice(0, questions.length)
                if (answers.length !== questions.length) {
                    return res.status(400).json({ message: "Number of questions or number of answer don't match" })
                }
                let errs = validateAnswers(questions, answers)
                if (errs.length > 0) {
                    return res.status(400).json(errs)
                }
                const mapedQandA = mapQuestionsAndAnswers(questions, answers, questionsOwner.id, linkID)
                console.log(mapedQandA)
                const answered = await prisma.customAnswer.createMany({ data: mapedQandA })
                if (answered.count > 0) {
                    const qLinks = Array.isArray(questionsOwner.questionsLinks) ? questionsOwner.questionsLinks : [] as any[]
                    const updatedLinks = [{ linkID: linkID, label: questionsOwner.currentLinkLabel }].concat(qLinks)
                    await prisma.user.update({ where: { id: questionsOwner.id }, data: { currentLinkID: null, currentLinkLabel: null, questionsLinks: updatedLinks } })
                }
                return res.json(answered)

            } catch (error) {
                console.log(error)
            }
            break
        default:
            res.setHeader('Allow', ['POST', 'GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}