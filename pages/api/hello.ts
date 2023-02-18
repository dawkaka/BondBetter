
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "login required" })
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
    })

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    let responses = 0
    let answered = 0
    let partner = null

    if (Array.isArray(user.questionsLinks)) {
        responses = user.questionsLinks.length
    }

    if (user.sendRequest || user.recievedRequest) {
        let t = user.sendRequest ? user.sendRequest : user.recievedRequest ? user.recievedRequest : undefined
        answered = await prisma.coupleAnswer.count({ where: { userID: user.id, coupleID: user.coupleID || undefined } })
        partner = await prisma.user.findUnique({ where: { email: t }, select: { name: true, image: true, email: true } })
    }
    const { name, image, email, sendRequest, recievedRequest, currentStreak } = user

    res.json({ name, email, image, currentStreak, responses, answered, partner, sendRequest, recievedRequest, hasPartner: !!user.coupleID })
}
