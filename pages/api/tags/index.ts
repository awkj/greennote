import type { NextApiRequest, NextApiResponse } from 'next'
import { Tag } from '@prisma/client'
import { prisma } from '../db/conn'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Tag[]>
) {
    const allTag = await prisma.tag.findMany()
    res.json(
        allTag
    )
}
