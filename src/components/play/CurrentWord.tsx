import gameStore from "./data/store"
import { tilesToWord } from "./data/utils"
import useKeyPress from "../../hooks/useKeyPress"

const CurrentWord = () => {
  const gameStarted = gameStore().gameStarted
  const word = gameStore().currentWord
  const tiles = gameStore().tiles
  const wasIncorrect = gameStore().wasIncorrectWord
  const wasFound = gameStore().alreadyFound

  const backspace = gameStore().backspace
  const clear = gameStore().clearWord
  const toggleIncorrect = gameStore().toggleIncorrectWord
  const toggleAlreadyFound = gameStore().toggleAlreadyFound

  const updateAnimation = () => {
    setTimeout(() => {
      toggleIncorrect(false)
      toggleAlreadyFound(false)
    }, 500)
  }

  useKeyPress("Backspace", backspace)
  useKeyPress("Delete", backspace)
  useKeyPress("Escape", clear)

  return (
    <h2
      className="board__current-word"
      onAnimationEnd={updateAnimation}
      data-warn={wasFound || wasIncorrect}
    >
      {!gameStarted
        ? ""
        : wasIncorrect
        ? "Not a word"
        : wasFound
        ? "Already found!"
        : tilesToWord(word, tiles)}
    </h2>
  )
}

export default CurrentWord
