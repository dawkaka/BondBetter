
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"


export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (method) {
        case "GET":
            const user = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { coupleID: true } })
            if (!user) {
                return res.status(404).json({ message: "Something went wrong" })
            }
            if (!user.coupleID) {
                return res.json({ type: 'No Partner', message: 'Not a couple' })
            }
            const answers = await prisma.coupleAnswer.findMany({ where: { coupleID: user.coupleID } })
            res.json(answers)
            break;
        default:
            break;
    }
}