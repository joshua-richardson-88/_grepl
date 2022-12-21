import styles from "./TitleBoard.module.css"

const cubes = "gqvxkrwtyewlbopm".split("")
const getColor = (n: number) =>
  [0, 5, 9, 11, 14].includes(n) ? ` ${styles.active}` : ""
const getDelay = (n: number) => ` ${styles[`delay-${(n + 1) * 100}`]}`

const Cubes = () => (
  <>
    {cubes.map((e, i) => (
      <div key={i} className={`${styles.cube}${getColor(i)}${getDelay(i)}`}>
        {e}
      </div>
    ))}
  </>
)

const TitleBoard = () => (
  <div className={styles.board}>
    <Cubes />
    <div className={styles.base} />
  </div>
)
export default TitleBoard
