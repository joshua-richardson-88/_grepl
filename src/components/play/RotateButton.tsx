import useKeyPress from "../../hooks/useKeyPress"
import gameStore from "./data/store"

const RotateCWIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
    />
  </svg>
)
const RotateCCWIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
    />
  </svg>
)

type ButtonProps = { dir: "cw" | "ccw" }
const RotateButton = ({ dir }: ButtonProps) => {
  const rotate = gameStore().rotateTiles
  const keyPressed = useKeyPress(
    dir === "cw" ? "ArrowRight" : "ArrowLeft",
    () => rotate(dir),
  )

  return (
    <button
      name={`rotate-${dir === "cw" ? "" : "counter-"}clockwise`}
      className={`rotateButton insetShadow${keyPressed ? " active" : ""}`}
      type="button"
      onClick={() => rotate(dir)}
    >
      {dir === "cw" ? <RotateCWIcon /> : <RotateCCWIcon />}
    </button>
  )
}

export default RotateButton
