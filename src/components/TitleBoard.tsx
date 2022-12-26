const cubes = "gqvxkrwtyewlbopm".split("")
const getColor = (n: number) =>
  [0, 5, 9, 11, 14].includes(n) ? ` cube--active` : ""
const getDelay = (n: number) => ` delay-${(n + 1) * 100}`

const Cubes = () => (
  <>
    {cubes.map((e, i) => (
      <div key={i} className={`cube${getColor(i)}${getDelay(i)}`}>
        {e}
      </div>
    ))}
  </>
)

const TitleBoard = () => (
  <div className="title-board">
    <Cubes />
    <div className="title-board__base" />
  </div>
)
export default TitleBoard
