import { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"

import Header from "../components/Header"
import GameList from "../components/profile/GameList"
import UserCard from "../components/profile/UserCard"
import { isSSR } from "../utils/isSSR"

const Profile: NextPage = () => {
  const [clientOnly, setClientOnly] = useState(false)
  useEffect(() => {
    if (!isSSR) setClientOnly(true)
  }, [isSSR])

  return (
    <>
      <Head>
        <title>Grepl | Profile</title>
        <meta name="description" content="Grepl - a digital board game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="wrapper wrapper--gap">
        {clientOnly && (
          <div className="profile">
            <UserCard />
            <GameList />
          </div>
        )}
      </main>
    </>
  )
}

export default Profile
