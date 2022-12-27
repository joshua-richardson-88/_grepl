import { useRef } from "react"

import userStore from "../profile/data/store"
import gameStore from "./data/store"

const GameButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isGameStarted = gameStore().gameStarted
  const tiles = gameStore().tiles
  const words = gameStore().wordList
  const heatMap = gameStore().heatMap

  const startGame = gameStore().startGame
  const endGame = gameStore().endGame

  const persistGame = userStore().addGame

  const clickHandler = () => {
    buttonRef.current?.blur()
    if (isGameStarted) {
      persistGame("solo", tiles, words, heatMap)
      endGame()
    } else {
      startGame()
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
