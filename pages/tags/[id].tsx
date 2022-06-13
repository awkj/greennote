import type { NextPage } from 'next'
import { useRouter } from "next/router"
import { useEffect } from "react"
import Display from "../../components/display"
import Editor from "../../components/editor"
import Layout from "../containers/layout"


const Home: NextPage = () => {
  return (
    <Layout><Display /></Layout>
  )
}

export default Home
