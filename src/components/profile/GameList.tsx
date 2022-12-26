import { caclulatePointsEarned, HeatMap } from "../play/data/utils"
import userStore, { type Game, type GameType } from "./data/store"

const reduceScore = (as: string[]) =>
  as.reduce((a, v) => a + caclulatePointsEarned(v.length), 0)

const Tile = ({ letter, opacity }: TileProps) => (
  <div className="gameCard__tile">
    <span
      className="gameCard__tile-bg"
      style={{ backgroundColor: `rgba(21 128 61 / ${opacity})` }}
    ></span>
    <span className="gameCard__tile-letter">{letter}</span>
  </div>
)
const TileList = ({ heatMap, tiles }: TileListProps) => (
  <div className="gameCard__tiles">
    {tiles.map((tile, i) => (
      <Tile key={i} letter={tile} opacity={(heatMap[i] ?? 0) / heatMap.max} />
    ))}
  </div>
)
const CardHeader = ({ date, score, type }: CardHeaderProps) => (
  <div className="gameCard__header">
    <div className="flex-col">
      <p className="gameCard__header-type">
        {type === "solo" ? "Solo Play" : "Multiplayer"}
      </p>
      <p className="gameCard__header-date">{new Date(date).toLocaleString()}</p>
    </div>
    <h2>{score}</h2>
  </div>
)
const WordList = ({ words }: WordListProps) => {
  if (words.length === 0) return null
  return (
    <div className="gameCard__list">
      <h3>Words Found</h3>
      <p>
        {words
          .filter((w) => w.length > 2)
          .sort((a, b) => b.length - a.length)
          .join(" • ")}
      </p>
    </div>
  )
}

const GameCard = ({ date, heatMap, tiles, type, words }: Game) => (
  <div className="gameCard">
    <CardHeader date={date} score={reduceScore(words)} type={type} />
    <TileList tiles={tiles} heatMap={heatMap} />
    <WordList words={words} />
  </div>
)

const GameList = () => {
  const games = userStore().games

  return (
    <div className="gameList">
      {games.map((game, i) => (
        <GameCard key={i} {...game} />
      ))}
    </div>
  )
}
export default GameList

type TileListProps = { tiles: string[]; heatMap: HeatMap }
type TileProps = { letter: string; opacity: number }
type CardHeaderProps = { date: number; score: number; type: GameType }
type WordListProps = { words: string[] }
