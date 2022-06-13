import { Tag } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import useSWR from "swr"
import { selectTagState, tagState } from "../lib/state"
import svg from "../lib/svg"

const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function Sidebar() {
    const [tagsData, setTagsData] = useRecoilState(tagState)
    useEffect(() => {
        console.log("运行一次")
        const fetchNote = async () => {
            const res = await fetch(`/api/tags`)
            const dataJson: Tag[] = await res.json()
            setTagsData(dataJson)
        }

        if (tagsData.length === 0) {
            fetchNote()
        }
    }, [0])

    return (
        <div className="fixed mt-14 overflow-y-auto bg-[#F7F7F7]  h-full">
            <div className="flex flex-col items-center my-8">
                <Link href="/note/new">
                    <a className="bg-[#00C28B] hover:bg-[#00AA7A] text-white w-40 h-[30px] rounded-sm flex justify-center items-center">新建</a>
                </Link>
                <ul className="flex flex-col  mt-6">
                    <TagCard name="所有笔记" key={""} id="all"></TagCard>
                    {tagsData.length > 0 && tagsData.map((tag) => { return <TagCard name={tag.name} key={tag.id} id={tag.id.toString()} ></TagCard> })}
                </ul>
            </div>

        </div >
    )
}



function TagCard({ name, id }: { name: string, id: string }) {
    const [tagSelect, setTagSelect] = useRecoilState(selectTagState)
    const isSelected = tagSelect === id
    return (
        <Link
            href={`/tags/${id}`}
        >
            <a
                className={`flex w-[234px] py-2.5 items-center pl-8 hover:bg-[#EDEDED]  text-[#BCBCBC]  border-l-4 ${isSelected ? " border-[#00C28B] text-[#00C28B]" : ""} `}
                onClick={() => { setTagSelect(id) }}
            >
                <div className="w-5 h-5">
                    {name === "所有笔记" ? svg.document : svg.tag}
                </div>
                <span className="text-black/80 ml-2  text-sm">{name}</span>
            </a>
        </Link>

    )
}