
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../../lib/prismadb"
import { Notifs } from "../../../types"
import { authOptions } from "../auth/[...nextauth]"


export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const session = await getServerSession(req, res, authOptions)

    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (method) {
        case "GET":
            try {
                const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
                if (!user) {
                    return res.status(404).json({ messege: "User not found" })
                }

                if (user.recievedRequest) {
                    const partner = await prisma.user.findUnique({ where: { email: user.recievedRequest } })
                    if (!partner) {
                        return res.status(404).json({ message: "Parnter not found, they might have deleted their account" })
                    }
                    return res.json({ type: "recieved", user: { name: partner.name, image: partner.image } })
                } else if (user.sendRequest) {
                    const partner = await prisma.user.findUnique({ where: { email: user.sendRequest } })
                    if (!partner) {
                        return res.status(404).json({ message: "Parnter not found, they might have deleted their account" })
                    }
                    return res.json({ type: "sent", user: { name: partner.name, image: partner.image } })
                }

                return res.status(404).json({ messaeg: "No pending request" })

            } catch (error) {
                res.status(500).json({ message: "Something went wrong" })
            }
            break;

        case "PUT":
            try {

                const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
                if (!user) {
                    return res.status(404).json({ message: "Something went wrong" })
                }
                if (!user.recievedRequest) {
                    return res.status(400).json({ message: "You have no pending request at the moment" })
                }
                const partner = await prisma.user.findUnique({ where: { email: user.recievedRequest } })
                if (!partner) {
                    return res.status(400).json({ message: "Something went wrong" })
                }

                let notif = partner.notifications as any
                if (!notif) {
                    notif = { response: false, request: true }
                } else {
                    notif.request = true
                }
                var yesterday = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate() - 1));
                await prisma.$transaction(async (tx) => {
                    const cp = await tx.couple.create({ data: { initiated: partner.id, accepted: user.id } });
                    await tx.user.update({ where: { email: user.email }, data: { partnerID: partner.id, nextQuestionsTime: yesterday, coupleID: cp.id } });
                    await tx.user.update({
                        where: { email: partner?.email },
                        data: {
                            partnerID: user.id,
                            nextQuestionsTime: yesterday,
                            coupleID: cp.id,
                            notifications: notif
                        }
                    });
                    return cp
                })
                return res.json({ message: "Created successfully, you can now begin answering daily questions" })
            } catch (error) {
                res.status(500).json({ message: "Something went wrong" })
            }
            break;
        case "DELETE":
            try {
                const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
                if (!user) {
                    return res.status(404).json({ messege: "User not found" })
                }
                let partner
                if (user.sendRequest) {
                    partner = await prisma.user.findUnique({ where: { email: user.sendRequest } })
                } else if (user.recievedRequest) {
                    partner = await prisma.user.findUnique({ where: { email: user.recievedRequest } })
                }
                if (partner) {
                    const val = await prisma.$transaction([
                        prisma.user.update({ where: { email: user.email }, data: { sendRequest: null, recievedRequest: null } }),
                        prisma.user.update({ where: { email: partner?.email }, data: { sendRequest: null, recievedRequest: null } }),
                    ])
                    return res.json({ messaeg: "Request sent", v: val })
                }
                return res.json({ message: "Request deleted" })
            } catch (error) {
                res.status(500).json({ message: "Something went wrong" })
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}