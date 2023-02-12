import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"


export default async function stopHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (method) {
        case "POST":
            try {
                const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
                if (!user) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                if (!user.partnerID) {
                    return res.status(401).json({ message: "Single already" })
                }
                const couple = await prisma.$transaction([
                    prisma.user.update({ where: { email: user.email }, data: { partnerID: null, coupleID: null } }),
                    prisma.user.update({ where: { id: user.partnerID }, data: { partnerID: null, coupleID: null } }),
                ])
                res.json({ message: "Stopped successfully" })
            } catch (error) {
                res.status(500).json({ message: "Something went wrong" })
            }
            break;
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}