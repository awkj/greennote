import { Note } from "@prisma/client"
import type { NextPage } from 'next'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Editor from "../../components/editor"
import Layout from "./../containers/layout"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
    return (
        <Layout><Editor /></Layout>
    )
}

export default Home
