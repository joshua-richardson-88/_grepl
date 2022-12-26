import gameStore from "./data/store"

const Score = () => {
  const n = gameStore().score

  return (
    <div className="board__score">
      <p>Score</p>
      <p className="board__large-text">{n}</p>
    </div>
  )
}
export default Score
