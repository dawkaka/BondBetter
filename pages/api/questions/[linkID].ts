import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prismadb"


export default async function LinkHandler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method } = req
    const linkID = Array.isArray(query) ? query[0].linkID : query.linkID
    switch (method) {
        case "GET":
            const questionsOwner = await prisma.user.findFirst({ where: { currentLinkID: linkID } })
            if (!questionsOwner) {
                return res.status(404).json({ message: "Link is not longer available or never existed" })
            }
            return res.json(questionsOwner.questions)
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}