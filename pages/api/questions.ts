import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"


export default async function questionsHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    console.log(session)
    const { query, method } = req
    const id = parseInt(query.id as string, 10)
    const name = query.name as string

    if (!session) {
        return res.status(401).json({ message: "Login required" })
    }

    switch (method) {
        case 'GET':
            // Get data from your database
            try {
                const userQuestions = await prisma.user.findUnique({ where: { email: session.user?.image || undefined } })
                if (!userQuestions) {
                    return res.status(404).json({ message: "user not found" })
                }

                res.status(200).json(userQuestions)

            } catch (error) {
                return res.status(400).json({ error: error })
            }
            break
        case 'PUT':
            try {
                const userQuestions = await prisma.user.update({ where: { email: session.user?.image || undefined }, data: { questions: req.body } })
                if (!userQuestions) {
                    return res.status(404).json({ message: "user not found" })
                }

                res.status(200).json(userQuestions)

            } catch (error) {
                return res.status(400).json({ error: error })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}