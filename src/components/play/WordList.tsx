import gameStore from "./data/store"

const WordList = () => (
  <div className="word-list">
    <h3 className="word-list__title">Words Found</h3>
    <div className="word-list__container">
      {gameStore().wordList.map((w, i) => (
        <p
          key={i}
          className={i === 0 ? "active wordList__word" : "wordList__word"}
        >
          {w}
        </p>
      ))}
    </div>
  </div>
)
export default WordList
