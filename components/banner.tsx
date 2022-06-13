import SVG from "../lib/svg"
export default function Banner() {
    const isMobile = false

    return (
        <div className="fixed w-full h-14 bg-[#00C28B] flex items-center left-0 right-0 top-0">
            {isMobile ?
                <div className="mx-3">
                    <button className="h-6 w-6 text-white">
                        {SVG.menu}
                    </button>
                </div>
                :
                <span className="text-white ml-10">随笔记</span>
            }
        </div>
    )
}
