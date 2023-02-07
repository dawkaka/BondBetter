
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { SampleQuestions } from "../../text"
import { authOptions } from "./auth/[...nextauth]"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(401).json({ message: "login required" })
    }

    const users = await prisma.user.findMany({ where: {} })
    res.json(users)
}
