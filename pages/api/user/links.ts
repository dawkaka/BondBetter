import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "../../../lib/prismadb"
import { authOptions } from "../auth/[...nextauth]";


export default async function UserLinkHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (method) {
        case "GET":
            const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            res.json(user.questionsLinks)
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}