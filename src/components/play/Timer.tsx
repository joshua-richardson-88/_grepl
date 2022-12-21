import { useState, useEffect } from "react"

import userStore from "../profile/data/store"
import gameStore from "./data/store"

type Props = { duration: number }
const Timer = ({ duration }: Props) => {
  const [t, setT] = useState(-1)
  const isGameStarted = gameStore().gameStarted

  const endGame = gameStore().endGame
  const persistGame = userStore().addGame

  useEffect(() => {
    if (!isGameStarted) {
      if (t > -1) setT(-1)
      return
    }
    if (isGameStarted && t === -1) setT(duration)
    if (t === 0) {
      endGame()

      persistGame("solo")
      setT(-1)
      return
    }
    const timer = setInterval(() => setT((p) => p - 1), 1000)
    return () => clearInterval(timer)
  }, [duration, endGame, isGameStarted, persistGame, t])

  const textColor =
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
    <div className="timer">
      <p>Time Left</p>
      <p className={`text-large text-center${textColor}`}>{timeLeft}</p>
    </div>
  )
}
export default Timer
