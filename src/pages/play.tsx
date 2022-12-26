import { NextPage } from "next"
import Head from "next/head"
import { useCallback, useEffect, useState } from "react"

import Header from "../components/Header"
import GameBoard from "../components/play"
import gameStore, { Position } from "../components/play/data/store"
import WordList from "../components/play/WordList"

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = (f: any, x: number) => {
  let timerId: NodeJS.Timeout | undefined
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => f(...args), x)
  }
}

const Play: NextPage = () => {
  const [pressed, setPressed] = useState(false)
  const update = gameStore().updateTouchPosition
  const debounceHandler = useCallback(
    (e: PointerEvent) => {
      if (pressed) debounce(update({ x: e.pageX, y: e.pageY }), 200)
    },
    [pressed, update],
  )

  useEffect(() => {
    const startHandler = (e: PointerEvent) => {
      setPressed(true)
      debounceHandler(e)
    }
    const finishHandler = () => {
      setPressed(false)
      update({ x: null, y: null })
    }

    window.addEventListener("pointerdown", startHandler, { passive: false })
    window.addEventListener("pointermove", debounceHandler, { passive: false })
    window.addEventListener("pointerup", finishHandler, { passive: false })
    return () => {
      window.removeEventListener("pointerdown", debounceHandler)
      window.removeEventListener("pointermove", debounceHandler)
      window.removeEventListener("pointerup", finishHandler)
    }
  }, [debounceHandler, update])

  return (
    <>
      <Head>
        <title>Grepl | Play</title>
        <meta name="description" content="Grepl - a digital board game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="wrapper wrapper--gap">
        <GameBoard />
        <WordList />
      </main>
    </>
  )
}
export default Play
