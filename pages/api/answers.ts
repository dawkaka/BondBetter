
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import prisma from "../../lib/prismadb"
import { authOptions } from "./auth/[...nextauth]"


export default async function requestHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (method) {
        case "GET":
            const skip = parseInt(query.page as string)
            const user = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { coupleID: true, id: true } })
            if (user === null) {
                return res.status(404).json({ message: "Something went wrong" })
            }
            if (!user.coupleID) {
                return res.json({ type: 'No Partner', message: 'Not a couple' })
            }
            const rawAns = await prisma.coupleAnswer.findMany({
                orderBy: { time: "desc" },
                skip: skip,
                take: 10,
                where: { coupleID: user.coupleID },
                select: { user: { select: { name: true } }, question: { select: { question: true } }, answer: true, time: true, questionID: true, userID: true }
            })
            const answers = rawAns.filter(ans => ans.user !== null)

            const ans = answers.reduce((acc, val) => {
                if (!val.user) return acc
                if (acc[val.questionID]) {
                    let v = acc[val.questionID]
                    if (!v) return acc
                    if (val.userID === user.id) {
                        v.user = { name: val.user.name, answer: val.answer }
                    } else {
                        v.partner = { name: val.user.name, answer: val.answer }
                    }
                } else {
                    let v: { user?: {}, partner?: {}, question: string } = { question: val.question.question }
                    if (val.userID === user.id) {
                        v.user = { name: val.user.name, answer: val.answer }
                    } else {
                        v.partner = { name: val.user.name, answer: val.answer }
                    }
                    acc[val.questionID] = v
                }
                return acc
            }, <{ [key: number]: { user?: {}, partner?: {}, question: string } }>{})

            let filtered = Object.values(ans).filter(v => {
                return v.user !== undefined
            })
            res.json({ answers: filtered, pagination: { next: skip + 10, end: rawAns.length < 10 } })
            break;
        default:
            break;
    }
}