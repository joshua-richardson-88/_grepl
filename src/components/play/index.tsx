import GameButton from "./GameButton"
import Timer from "./Timer"
import Score from "./Score"
import RotateButton from "./RotateButton"
import ClearButton from "./ClearButton"
import SubmitButton from "./SubmitButton"
import Game from "./Gameboard"
import CurrentWord from "./CurrentWord"
import Challenge from "./Challenge"

const GameBoard = () => {
  return (
    <div className="board">
      <GameButton />
      <Timer />
      <Score />
      <RotateButton dir="cw" />
      <Game />
      <ClearButton />
      <RotateButton dir="ccw" />
      <SubmitButton />
      <CurrentWord />
      <Challenge />
    </div>
  )
}

export default GameBoard
