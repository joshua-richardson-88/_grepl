import { useEffect, useState } from "react"

type Props = {
  callback: () => void
  duration: number
}
type TimerTuple = [number, { start: () => void; stop: () => void }]

const decrement = (n: number) => n - 1
const useTimer = ({ callback, duration }: Props): TimerTuple => {
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(-1)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(decrement), 1000)
    const clear = () => clearInterval(timer)
    if (!started) setTimeLeft(-1)
    if (started && timeLeft < 0) setTimeLeft(duration)
    if (started && timeLeft === 0) {
      // setStarted(false)
      callback()
    }

    return clear
  }, [callback, started, timeLeft])

  return [
    timeLeft,
    {
      start: () => setStarted(true),
      stop: () => setStarted(false),
    },
  ]
}

export default useTimer
