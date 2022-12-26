import GameButton from "./GameButton"
import Timer from "./Timer"
import Score from "./Score"
import RotateButton from "./RotateButton"
import ClearButton from "./ClearButton"
import SubmitButton from "./SubmitButton"
import Game from "./Gameboard"
import CurrentWord from "./CurrentWord"

const GameBoard = () => {
  return (
    <div className="board">
      <GameButton />
      <Timer duration={1800} />
      <Score />
      <RotateButton dir="cw" />
      <Game />
      <ClearButton />
      <RotateButton dir="ccw" />
      <SubmitButton />
      <CurrentWord />
    </div>
  )
}

export default GameBoard
