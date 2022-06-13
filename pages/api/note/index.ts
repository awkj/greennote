import type { NextApiRequest, NextApiResponse } from 'next'
import { Note } from '@prisma/client'
import { prisma } from '../db/conn'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Note | null>
) {
    const body = JSON.parse(req.body)
    switch (req.method) {
        case 'POST':
            await handlePOST(body.content, res)
    }
}

async function handlePOST(content: string, res: NextApiResponse<Note>) {
    const result = await prisma.note.create({
        data: {
            content: content,
        }
    })
    res.status(200).send(result)
}
