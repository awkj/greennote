import { Note } from "@prisma/client"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function NotesDisplay() {
    const [notes, setNotes] = useState([] as Note[])
    const [isLoading, setLoading] = useState(true)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const fetchNote = async () => {
            let res: Response
            if (id == "all") {
                res = await fetch(`/api/notes/all`)
            } else {
                res = await fetch(`/api/tags/${id}`)
            }
            const dataJson: Note[] = await res.json()
            setNotes(dataJson)
        }

        if (router.isReady && id) {
            console.log("query", router.query)
            setLoading(false)
            fetchNote()
        }
    }, [id])

    console.log("notes", notes)
    if (!notes) return <div>Loading...</div>

    return (
        <div className="flex  justify-center mt-2 md:mt-8 mx-2">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5 h-fit">
                {notes.map((note) => { return <NoteCard note={note} key={note.id}></NoteCard> })}
            </div>
        </div>

    )
}


function NoteCard({ note }: { note: Note }) {
    return (
        <Link href={`/note/${note.id}`}>
            <a className="flex flex-col rounded border hover:border-[#00C28B] max-w-[240px] h-[180px] p-4 justify-between ">
                <p className="text-black/[85] overflow-hidden whitespace-nowrap text-ellipsis  text-sm ">{note.content.substring(0, 13)}</p>
                <p className="text-black/60 text-xs h-[100px] leading-relaxed my-1"> {note.content.substring(0, 50)}</p>
                <p className="text-black/30 text-xs">{dayjs(note.modifiedTime).format("YYYY-MM-DD HH:mm:ss")}</p>
            </a>
        </Link>
    )
}