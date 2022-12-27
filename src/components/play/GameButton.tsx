import { useRouter } from "next/router"
import { useRef } from "react"

import userStore from "../profile/data/store"
import gameStore from "./data/store"

const GameButton = () => {
  const router = useRouter()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isGameStarted = gameStore().gameStarted

  const startGame = gameStore().startGame
  const endGame = gameStore().endGame

  const persistGame = userStore().addGame

  const clickHandler = () => {
    const gameParam =
      typeof router?.query?.game === "string" ? router?.query?.game : undefined
    buttonRef.current?.blur()
    if (isGameStarted) {
      persistGame("solo")
      endGame()
    } else {
      startGame(gameParam)
      router.replace("/play", undefined, { shallow: true })
    }
  }

  return (
    <button
      tabIndex={0}
      className="board__button board__button--play"
      onClick={clickHandler}
      ref={buttonRef}
      data-game-running={isGameStarted}
    >
      {isGameStarted ? "End" : "Start"}
    </button>
  )
}
export default GameButton
