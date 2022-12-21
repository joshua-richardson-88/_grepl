import gameStore from "./data/store"

const Score = () => {
  const n = gameStore().score

  return (
    <div className="score">
      <p>Score</p>
      <p className="text-large text-center">{n}</p>
    </div>
  )
}
export default Score
