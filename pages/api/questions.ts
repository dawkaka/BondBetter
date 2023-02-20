import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { validateQuestions } from "../../lib/uitls"
import { authOptions } from "./auth/[...nextauth]"


export default async function questionsHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    const { method } = req

    if (!session) {
        return res.status(401).json({ message: "Login required" })
    }

    switch (method) {
        case 'GET':
            try {
                const userQuestions = await prisma.user.findUnique({ where: { email: session.user?.email! } })
                if (!userQuestions) {
                    return res.status(404).json({ message: "user not found" })
                }
                res.status(200).json(userQuestions.questions)

            } catch (error) {
                return res.status(400).json({ error: error })
            }
            break
        case 'PUT':
            try {
                const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
                if (!user) {
                    return res.status(404).json({ message: "user not found" })
                }
                if (user.currentLinkID) {
                    return res.status(403).json({ message: "To create or edit questoins, you must delete generated link" })
                }
                if (!Array.isArray(req.body)) {
                    return res.status(400).json({ message: "The request body must be an array of questions" });
                }
                if (req.body.length > 25) {
                    return res.status(400).json({ message: "The number of questions in the array cannot be more than 25" });
                }
                const qErrors = validateQuestions(req.body)
                if (qErrors.length > 0) {
                    return res.status(400).json(qErrors)
                }
                const userQuestions = await prisma.user.update({
                    where: { email: session.user?.email! },
                    data: { questions: req.body },
                });
                return res.status(200).json(userQuestions);
            } catch (error) {
                console.log(error)
                return res.status(400).json({ message: "Something went wrong" });
            }
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}