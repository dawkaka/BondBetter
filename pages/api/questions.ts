import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"


export default async function questionsHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    const { method } = req

    if (!session) {
        return res.status(401).json({ message: "Login required" })
    }

    switch (method) {
        case 'GET':
            // Get data from your database
            try {
                const userQuestions = await prisma.user.findUnique({ where: { email: session.user?.email || undefined } })
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
                // Validate the req.body
                if (!Array.isArray(req.body)) {
                    return res.status(400).json({ message: "The request body must be an array of questions" });
                }
                if (req.body.length > 25) {
                    return res.status(400).json({ message: "The number of questions in the array cannot be more than 25" });
                }
                for (let i = 0; i < req.body.length; i++) {
                    const question = req.body[i];
                    if (!question.question || typeof question.question !== "string" || question.question.length > 256) {
                        return res.status(400).json({ message: "Each question must be a string not greater than 256 characters" });
                    }
                    if (!question.type || (question.type !== "openEnded" && question.type !== "closeEnded" && question.type !== "both")) {
                        return res.status(400).json({ message: "Each question must have a type of either 'openEnded', 'closeEnded', or 'both'" });
                    }
                }
                const userQuestions = await prisma.user.update({
                    where: { email: session.user?.email || undefined },
                    data: { questions: req.body },
                });
                res.status(200).json(userQuestions);
            } catch (error: any) {
                return res.status(400).json({ error: error.message });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}