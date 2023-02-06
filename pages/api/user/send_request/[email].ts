
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../../../lib/prismadb"
import { authOptions } from "../../auth/[...nextauth]"


export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req
    const email = Array.isArray(query) ? query[0].email : query.email
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (method) {
        case "POST":
            try {

                if (session.user?.email === email) {
                    return res.status(409).json({ message: "You can't send a couple request to your self" })
                }

                const partner = await prisma.user.findUnique({ where: { email: email } })
                if (!partner) {
                    return res.status(401).json({ message: "This email doesn't not have an account, double check and try again" })
                }

                if (partner.partnerID || partner.recievedRequest) {
                    return res.status(409).json({ message: "The email owner has a partner already, or has a pending request" })
                }

                if (partner.sendRequest) {
                    return res.status(409).json({ message: "You have a pending request" })
                }

                const val = await prisma.$transaction([
                    prisma.user.update({ where: { email: session.user?.email! }, data: { sendRequest: email } }),
                    prisma.user.update({ where: { email: email }, data: { recievedRequest: session.user?.email } }),
                ])
                console.log(val)
                return res.status

            } catch (error) {
                res.status(500).json({ message: "Something went wrong" })
            }
            break;
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}