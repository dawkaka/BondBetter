import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { Notifs } from "../../types"
import { authOptions } from "./auth/[...nextauth]"




export default async function questionsHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    const { method, query } = req

    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    const target = query.target as "response" | "request"
    switch (method) {
        case "GET":
            try {
                const user = await prisma.user.findUnique({ where: { email: session.user.email || undefined }, select: { notifications: true } })
                if (!user) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                return res.json(user.notifications)
            } catch (err) {
                res.status(500).json({ message: "Something went wrong" })
            }

        case "DELETE":
            try {
                const dUser = await prisma.user.findUnique({ where: { email: session.user.email || undefined }, select: { notifications: true } })
                if (!dUser) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                let notif = dUser.notifications as any
                if (!notif) {
                    notif = { response: false, request: false }
                } else {
                    notif[target] = false
                }
                await prisma.user.update({ where: { email: session.user.email || undefined }, data: { notifications: notif } })
                return res.json({})
            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: "Something went wrong" })
            }

        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}