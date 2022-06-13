import type { NextApiRequest, NextApiResponse } from 'next'
import { Note, prisma } from '../db/conn'

type Body = {
    content: string,
    tags: number[]
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Note | null>
) {
    const { id } = req.query
    const idInt = parseInt(id as string)
    let body
    if (req.body) {
        body = JSON.parse(req.body)
    }
    switch (req.method) {
        case 'PUT':
            await handlePUT(idInt, body, res)
            break
        case 'DELETE':
            await handleDELETE(idInt, res)
            break
        case 'GET':
            await handleGET(idInt, res)
            break
    }
}

async function handlePUT(id: number, body: Body, res: NextApiResponse<null>) {
    const resultPrevious = await prisma.tag_Note.findMany({
        where: {
            noteId: id
        }
    })

    const dbTags = resultPrevious.map((tagNote) => tagNote.tagId)

    // 需要新增的
    const tagsAdd = body.tags.filter((tagId) => !dbTags.includes(tagId))
    tagsAdd.forEach(async (tagId) => {
        await prisma.tag_Note.create({
            data: {
                noteId: id,
                tagId: tagId
            }
        })
    })


    // 需要删除的
    const tagsDel = dbTags.filter((tagId) => !body.tags.includes(tagId))
    await prisma.tag_Note.deleteMany({
        where: {
            tagId: {
                in: tagsDel
            }
        }
    })

    // 更新本表
    const result = await prisma.note.update({
        where: {
            id: id
        },
        data: {
            content: body.content,
        }
    })


    res.status(200).send(null)
}

async function handleDELETE(id: number, res: NextApiResponse<null>) {
    const result = await prisma.note.delete({
        where: {
            id: id
        },
    })
    res.status(200).send(null)
}

async function handleGET(id: number, res: NextApiResponse<Note | null>) {
    const result = await prisma.note.findFirst({
        where: {
            id: id
        }
    })

    const resultTags = await prisma.tag_Note.findMany({
        where: {
            noteId: id
        }
    })

    const tags = resultTags.map((tagNote) => tagNote.tagId)

    const note = result ? { ...result, tags } : null
    res.status(200).send(note)
}