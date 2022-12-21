import { useRef } from "react"

import userStore from "../profile/data/store"
import gameStore from "./data/store"

const GameButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isGameStarted = gameStore().gameStarted

  const startGame = gameStore().startGame
  const endGame = gameStore().endGame

  const persistGame = userStore().addGame

  const clickHandler = () => {
    buttonRef.current?.blur()
    if (isGameStarted) {
      persistGame("solo")
      endGame()
    } else {
      startGame()
    }
  }

  return (
    <button
      tabIndex={0}
      className={`gameButton insetShadow${isGameStarted ? "" : "animatePulse"}`}
      onClick={clickHandler}
      ref={buttonRef}
    >
      {isGameStarted ? "End" : "Start"}
    </button>
  )
}
export default GameButton
