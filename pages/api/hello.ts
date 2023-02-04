
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prismadb"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const users = await prisma.user.findMany()
    res.json(users)
}
