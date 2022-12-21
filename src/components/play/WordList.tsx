import gameStore from "./data/store"

const WordList = () => (
  <div className="wordList">
    <h3 className="wordList__title">Words Found</h3>
    <div className="wordList__container">
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
