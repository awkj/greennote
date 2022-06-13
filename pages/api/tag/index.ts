import type { NextApiRequest, NextApiResponse } from 'next'
import { Tag } from '@prisma/client'
import { prisma } from '../db/conn'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Tag | null>
) {

    const body = JSON.parse(req.body)
    // 创建标签
    switch (req.method) {
        case 'POST':
            await handlePOST(body.name, res)
            break
    }
}

async function handlePOST(name: string, res: NextApiResponse<Tag>) {
    const result = await prisma.tag.create({
        data: {
            name: name,
        }
    })
    res.status(200).send(result)
}
