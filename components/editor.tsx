import { Tag } from "@prisma/client"
import Link from "next/link"
import SVG from "../lib/svg"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { tagState } from "../lib/state"
import { useRouter } from "next/router"
import { Note } from '../pages/api/db/conn'

type Tool = {
    id: number
    Icon: JSX.Element
    func: Function
}

const tools: Tool[] = [
    {
        id: 0,
        Icon: SVG.share,
        func: (id: string) => {

        }
    },
    {
        id: 1,
        Icon: SVG.upload,
        func: () => { }
    },
    {
        id: 2,
        Icon: SVG.trash,
        func: (id: number) => {
            console.log("run")
            fetch(`/api/note/${id}`,
                {
                    method: "DELETE"
                }
            )
            window.location.href = "/"
        }
    }
]



export default function Editor() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(true)
    const { id } = router.query
    const [note, setNote] = useState({} as Note)
    const [selectTags, setSelectTags] = useState([] as number[])
    const [tagsData, setTagsData] = useRecoilState(tagState)
    const [input, setInput] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [showTag, setShowTag] = useState(false)

    useEffect(() => {
        const fetchNote = async () => {
            if (id) {
                const res = await fetch(`/api/note/${id}`)
                const dataJson: Note = await res.json()
                setNote(dataJson)
                setInput(dataJson.content)
                setSelectTags(dataJson?.tags)
            }

        }

        if (router.isReady) {
            console.log(router.query)
            setLoading(false)
            fetchNote()
        }
    }, [id])

    if (isLoading) {
        return <p>Loading</p>
    }


    if (!note) {
        return <p>Error</p>
    }



    if (!note) {
        setNote({
            id: 0,
            tags: [],
            content: "",
            etag: "",
            createTime: new Date(),
            modifiedTime: new Date(),
        })
    }

    return (
        <div className="flex flex-col justify-center w-[720px] my-4 md:my-8 space-y-4 mx-4 ">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Save note={note} input={input} isEdit={isEdit} selectTags={selectTags}></Save>
                    <div className="relactive">
                        <button
                            className="flex items-center ml-4"
                            onClick={() => {
                                setShowTag((e) => !e)
                            }}
                        >
                            <div className="w-5 h-5 text-[#BCBCBC]">
                                {SVG.tag}
                            </div>
                            <span
                                className=" text-black/50">选择标签</span>
                        </button>
                        <div className={`z-10 relative ${showTag ? "block" : "hidden"} top-2 bg-white`}>
                            <ul className="absolute  w-56 bg-white border rounded text-sm text-gray-700 divide divide-y py-2 shadow-md" >
                                {tagsData.map((tag) => {
                                    return <SelectTag tag={tag} selectTags={selectTags} setSelectTags={setSelectTags} setIsEdit={setIsEdit} key={tag.id}></SelectTag>
                                })}

                            </ul>
                        </div>
                    </div>
                </div>

                <ul className="flex divide divide-x space-x-3 h-5">
                    {tools.map((tool) => { return <Tool Icon={tool.Icon} func={tool.func} id={note!.id} key={tool.id}></Tool> })}
                </ul>
            </div>
            <textarea
                id="message"
                rows={4}
                className="block pt-4 w-full  grow border-t outline-none text-black/[60] leading-relaxed text-sm "
                placeholder="Your content ..."
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    console.log("change", e.target.value)
                    setInput(e.target.value)
                    setIsEdit(true)
                }}
                value={input}
            >
            </textarea >
        </div >

    )
}

function SelectTag({ tag, selectTags, setSelectTags, setIsEdit }: { tag: Tag, selectTags: number[], setSelectTags: Function, setIsEdit: Function }) {
    const isChecked = selectTags.includes(tag.id)

    return (
        <div className="flex items-center pl-6 py-2 rounded">
            <input id="default-checkbox" type="checkbox" value="" checked={isChecked} onChange={() => {
                if (isChecked) {
                    setSelectTags(selectTags.filter((id) => id !== tag.id))
                } else {
                    setSelectTags([...selectTags, tag.id])
                }
                setIsEdit(true)
            }} className="w-4 h-4 accent-[#00C28B] bg-gray-100 rounded border-gray-300 focus:ring-[#00C28B]" />
            <label htmlFor="default-checkbox" className="ml-3 text-sm font-medium text-gray-900 ">{tag.name}</label>
        </div>
    )
}

function Save({ note, input, isEdit, selectTags }: { note: Note, input: string, isEdit: boolean, selectTags: number[] }) {
    return (
        <Link href="/" >
            <a className="bg-[#F5F5F5] hover:bg-[#D6D6D6] px-6 py-1 text-sm font-light rounded-sm border border-[#BEBEBE]"
                onClick={() => {
                    if (isEdit) {
                        const data = {
                            content: input,
                            tags: selectTags
                        }

                        if (note.id !== 0) {
                            fetch(`/api/note/${note.id}`, {
                                method: "PUT",
                                body: JSON.stringify(data)
                            })
                        } else {
                            fetch(`/api/note`, {
                                method: "POST",
                                body: JSON.stringify(data)
                            })
                        }


                    }
                }
                }>
                {getButtonName(isEdit)}
            </a>
        </Link>
    )
}

function getButtonName(idEdit: boolean) {
    return idEdit ? "保存" : "返回"
}

function Tool({ Icon, func, id }: Tool & { id: number }) {
    return (<div className="pl-2">
        <button className="text-[#A2A2A2] hover:text-[#747474] h-5 w-5" onClick={() => { func(id) }}>
            {Icon}
        </button>
    </div>)
}

