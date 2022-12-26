import { type NextPage } from "next"
import Head from "next/head"

import Header from "../components/Header"
import TitleBoard from "../components/TitleBoard"

const Home: NextPage = () => (
  <>
    <Head>
      <title>Grepl | Home</title>
      <meta name="description" content="Grepl - a digital board game" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main className="wrapper wrapper--gap">
      <div className="wrapper__full-bleed">
        <TitleBoard />
      </div>
      <article>
        <p className="text-center">
          <span className="text-large">Meet Grepl,</span> a classic word-finding
          game
        </p>
        <p className="mt-4 text-center">
          Sign in to earn achievments and keep your progress across devices!
        </p>
      </article>
    </main>
  </>
)

export default Home
