import { useEffect, useRef, useState } from "react"
import usePrevious from "../../hooks/usePrevious"
import gameStore, { Position } from "./data/store"

const isWithinTile = (a: Position, b: DOMRect): boolean => {
  if (a.x == null || a.y == null) return false
  return (
    a.x >= b.x && a.x <= b.x + b.width && a.y >= b.y && a.y <= b.y + b.height
  )
}
const getAdjStyles = (word: number[], n: number) => {
  if (!word.includes(n)) return []

  const index = word.indexOf(n)
  const wordSegment =
    index === 0
      ? word.slice(index, index + 2)
      : word.slice(index - 1, index + 2)

  if (wordSegment.length < 1) return []

  const adjacent = [
    n % 4 === 0 || n < 4 ? -1 : n - 5,
    n < 4 ? -1 : n - 4,
    (n + 1) % 4 === 0 || n < 4 ? -1 : n - 3,
    n % 4 === 0 ? -1 : n - 1,
    (n + 1) % 4 === 0 ? -1 : n + 1,
    n % 4 === 0 || n > 11 ? -1 : n + 3,
    n > 11 ? -1 : n + 4,
    (n + 1) % 4 === 0 || n > 11 ? -1 : n + 5,
  ]

  return adjacent
    .map((i) => wordSegment.includes(i))
    .map((x, i) => {
      if (!x) return null
      if (i === 4) return "tile__adj--right"
      if (i === 5) return "tile__adj--bottom-left"
      if (i === 6) return "tile__adj--bottom"
      if (i === 7) return "tile__adj--bottom-right"
    })
    .filter(Boolean)
}

type Props = {
  isAdjacent: boolean
  letter: string
  position: number
  update: (n?: number) => void
}
const Cell = ({ isAdjacent, letter, position }: Props) => {
  const tileRef = useRef<HTMLDivElement>(null)
  const [withinTile, setWithinTile] = useState(false)
  const wasWithinTile = usePrevious(withinTile)

  const currentWord = gameStore().currentWord
  const gameStarted = gameStore().gameStarted
  const pointer = gameStore().pointer

  const addLetter = gameStore().addLetter
  const removeLetter = gameStore().removeLetter

  const adjLineStyles = getAdjStyles(currentWord, position)
  const selectedState = currentWord.includes(position)
    ? "selected"
    : isAdjacent
    ? "adjacent"
    : ""

  const handleClick = () => {
    if (!gameStarted) return
    if (withinTile === wasWithinTile || !withinTile) return
    if (currentWord.length === 0 || isAdjacent) addLetter(position)
    if (currentWord.includes(position)) removeLetter(position)
  }

  useEffect(() => {
    if (tileRef.current == null) return

    setWithinTile(
      isWithinTile(pointer, tileRef.current.getBoundingClientRect()),
    )
  }, [isWithinTile, pointer, tileRef])

  useEffect(() => {
    if (withinTile === wasWithinTile || !withinTile) return

    handleClick()
  }, [withinTile, wasWithinTile])

  return (
    <div className="tile">
      {adjLineStyles.map((e, i) => (
        <div key={i} className={`tile__adj${e ? ` ${e}` : ""}`} />
      ))}
      <div
        className="tile__button-container"
        ref={tileRef}
        data-selected={selectedState}
      >
        <button className="tile__button" onClick={handleClick}>
          {letter}
        </button>
      </div>
    </div>
  )
}

export default Cell
