import type { NextApiRequest, NextApiResponse } from 'next'
import { Note } from '@prisma/client'
import { prisma } from '../db/conn'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Note[]>
) {
    const { id } = req.query
    let allTag: Note[]
    if (id == "all") {
        const allTag = await prisma.note.findMany({
            take: 100,
            orderBy: {
                modifiedTime: 'desc',
            },
        })
        res.json(allTag)
    } else {
    }

}
