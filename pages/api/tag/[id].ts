import type { NextApiRequest, NextApiResponse } from 'next'
import { Tag } from '@prisma/client'
import { prisma } from '../db/conn'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Tag | null>
) {

    const { id } = req.query
    const idInt = parseInt(id as string)
    let body
    if (req.body) {
        body = JSON.parse(req.body)
    }
    // 创建标签
    switch (req.method) {
        case 'PUT':
            await handlePUT(idInt, body['name'], res)
            break
        case 'DELETE':
            await handleDELETE(idInt, res)
            break
    }
}

async function handlePUT(id: number, name: string, res: NextApiResponse<Tag>) {
    const result = await prisma.tag.update({
        where: {
            id: id
        },
        data: {
            name: name,
        }
    })
    res.status(200).send(result)
}

async function handleDELETE(id: number, res: NextApiResponse<null>) {
    const result = await prisma.tag.delete({
        where: {
            id: id
        },
    })
    res.status(200).send(null)
}