import type { NextPage } from 'next'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Editor from "../../components/editor"
import Layout from "../containers/layout"


const Home: NextPage = () => {

    return (
        <Layout><Editor note={undefined} /></Layout>
    )
}

export default Home
