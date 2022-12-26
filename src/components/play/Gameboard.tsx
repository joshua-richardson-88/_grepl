import { useState, useCallback, useEffect } from "react"
import Cell from "./Cell"
import gameStore, { getAdj, findPath } from "./data/store"

const keyIsLetter = (s: string) =>
  s.length === 1 && s.toLowerCase().match(/[a-z]/)

const Game = () => {
  const [adjacentCurrent, setAdjacentCurrent] = useState<number[]>([])

  const gameStarted = gameStore().gameStarted
  const currentWord = gameStore().currentWord
  const tiles = gameStore().tiles
  const tileMap = gameStore().tileMap

  const addLetter = gameStore().addLetter
  const clearWord = gameStore().clearWord

  const updateAdjacent = useCallback(
    (n?: number) => {
      if (currentWord.length === 0 || n == null) {
        setAdjacentCurrent([])
        return
      }

      setAdjacentCurrent(getAdj(currentWord[currentWord.length - 1] ?? -10))
    },
    [currentWord],
  )
  const keyToIndexes = useCallback(
    (s: string) =>
      tiles.reduce((a, v, i) => (v === s ? [...a, i] : a), [] as number[]),
    [tiles],
  )

  useEffect(() => {
    const word = currentWord[currentWord.length - 1]

    setAdjacentCurrent(word == null ? [] : getAdj(word))
  }, [currentWord, tiles])

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (!gameStarted) return
      if (!keyIsLetter(e.key)) return
      const key = e.key === "q" ? "QU" : e.key.toUpperCase()

      if (!tiles.includes(key)) return
      if (currentWord.length === 0) {
        const pos = keyToIndexes(key)[0]
        if (pos == null) return

        addLetter(pos)
        setAdjacentCurrent(getAdj(pos))
        return
      }
      const _path = findPath(tileMap)([
        ...currentWord.map((i) => tiles[i] ?? ""),
        key,
      ])
      if (_path == null) return

      const path = [..._path.values()].reverse()
      clearWord()
      path.forEach((l) => addLetter(l))
      const endOfWord = path[path.length - 1]
      if (endOfWord != null) setAdjacentCurrent(getAdj(endOfWord))
    }
    window.addEventListener("keydown", keyDownHandler)
    return () => window.removeEventListener("keydown", keyDownHandler)
  }, [
    addLetter,
    clearWord,
    findPath,
    gameStarted,
    getAdj,
    keyToIndexes,
    tileMap,
    tiles,
    currentWord,
  ])

  return (
    <div className="gameboard">
      {tiles.map((d, i) => (
        <Cell
          isAdjacent={adjacentCurrent.includes(i)}
          key={i}
          letter={d}
          position={i}
          update={updateAdjacent}
        />
      ))}
    </div>
  )
}

export default Game
