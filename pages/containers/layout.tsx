import Banner from "../../components/banner"
import Sidebar from "../../components/sidebar"

export default function Layout({ children }: { children: JSX.Element }) {
    return (
        <div>
            <Banner></Banner>
            <div className="flex h-screen">
                <div className="hidden md:block">
                    <Sidebar></Sidebar>
                </div>
                <div className="md:ml-[234px] mt-14 w-full flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}