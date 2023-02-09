
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { SampleQuestions } from "../../text"
import { authOptions } from "./auth/[...nextauth]"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "login required" })
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        select: { questionsLinks: true, coupleID: true, id: true, currentStreak: true }
    })

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    let responses = 0
    if (Array.isArray(user.questionsLinks)) {
        responses = user.questionsLinks.length
    }
    let answers = 0
    if (user.coupleID) {
        answers = await prisma.coupleAnswer.count({ where: { userID: user.id } })
    }
    res.json({ streak: user.currentStreak, responses, answers: answers })
}
