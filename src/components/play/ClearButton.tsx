import useKeyPress from "../../hooks/useKeyPress"
import gameStore from "./data/store"

const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="board__icon"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

const ClearButton = () => {
  const clearCurrent = gameStore().clearWord
  const keyPressed = useKeyPress("Escape", clearCurrent)

  return (
    <button
      name="clear word"
      type="button"
      className="board__button board__button--clear"
      onClick={clearCurrent}
      data-pressed={keyPressed}
    >
      <ClearIcon />
    </button>
  )
}
export default ClearButton
