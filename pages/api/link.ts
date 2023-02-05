import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { generateLink, validateQuestions } from "../../lib/uitls"
import { authOptions } from "./auth/[...nextauth]"


export default async function LinkHandler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    const { method } = req
    if (!session) {
        return res.status(401).json({ message: "Login required" })
    }

    switch (method) {
        case 'PUT':
            try {
                const user = await prisma.user.findUnique({ where: { email: session.user?.email! } })
                if (!user) {
                    return res.status(404).json({ message: "user not found" })
                }
                if (user.currentLinkID) {
                    return res.status(403).json({ message: "Delete existing link before creating  a new one" })
                }
                let newLink = generateLink()
                let linkExists = await prisma.customAnswer.findFirst({ where: { questionLinkID: newLink } })
                while (linkExists) {
                    newLink = generateLink()
                    linkExists = await prisma.customAnswer.findFirst({ where: { questionLinkID: newLink } })
                }
                await prisma.user.update({
                    where: { email: session.user?.email! },
                    data: { currentLinkID: newLink, currentLinkLabel: req.body.label || "No Label" },
                });
                return res.status(200).json({ message: "New link created successfully" });
            } catch (error: any) {
                return res.status(400).json({ error: error.message });
            }

        case 'DELETE':

            try {
                await prisma.user.update({
                    where: { email: session.user?.email! },
                    data: { currentLinkID: null, currentLinkLabel: null },
                });

                res.status(200).json({ message: "Link deleted succesfully" })

            } catch (error) {
                return res.status(400).json({ error: error })
            }

            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}