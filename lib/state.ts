import { atom, selector } from 'recoil'
import { Tag } from "@prisma/client"


export const selectTagState = atom({
    key: 'selectTagState',
    default: 'all',
})

export const tagState = atom({
    key: 'tagState',
    default: [] as Tag[],
})
