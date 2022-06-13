import type { NextApiRequest, NextApiResponse } from 'next'
import { Note } from '@prisma/client'
import { prisma } from '../db/conn'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Note[]>
) {
    const { id } = req.query
    const allTag = await prisma.tag_Note.findMany({
        where: {
            tagId: parseInt(id as string)
        },
        orderBy: {
            note: {
                modifiedTime: "desc"
            }
        },
        include: {
            // tag: true,
            note: true
        },
    })

    const notes: Note[] = allTag.map(item => item.note)
    res.status(200).send(notes)
}
