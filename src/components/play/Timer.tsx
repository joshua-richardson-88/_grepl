import { useState, useEffect } from "react"

import userStore from "../profile/data/store"
import gameStore from "./data/store"

const Timer = () => {
  const [t, setT] = useState(-1)
  const isGameStarted = gameStore().gameStarted
  const duration = gameStore().maxTime

  const endGame = gameStore().endGame
  const persistGame = userStore().addGame

  useEffect(() => {
    if (!isGameStarted) {
      if (t > -1) setT(-1)
      return
    }
    if (isGameStarted && t === -1) setT(duration)
    if (t === 0) {
      persistGame("solo")
      endGame()
      setT(-1)
      return
    }
    const timer = setInterval(() => setT((p) => p - 1), 1000)
    return () => clearInterval(timer)
  }, [duration, endGame, isGameStarted, persistGame, t])

  const timeIndicator =
    t < 0
      ? ""
      : t <= duration / 4
      ? " danger"
      : t <= duration / 2
      ? " warning"
      : ""

  const timeLeft =
    t > 0
      ? `${Math.floor(t / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(t % 60)
          .toString()
          .padStart(2, "0")}`
      : "--:--"

  return (
    <div className="board__timer">
      <p>Time Left</p>
      <p className="board__large-text" data-time={timeIndicator}>
        {timeLeft}
      </p>
    </div>
  )
}
export default Timer
