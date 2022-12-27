import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import usePrevious from "../../hooks/usePrevious"
import gameStore from "./data/store"

const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="board__icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
    />
  </svg>
)

const Challenge = () => {
  const [copied, setCopied] = useState(false)
  const [tiles, setTiles] = useState("")

  const gameStarted = gameStore().gameStarted
  const _tiles = gameStore().tiles.join("").toLowerCase()

  const shareClick = () => {
    setCopied(true)
    const { protocol, host } = window.location
    navigator.clipboard.writeText(`${protocol}//${host}/play?game=${tiles}`)
    setTiles(_tiles)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (copied) {
      timer = setTimeout(() => {
        setCopied(false)
      }, 3000)
    }

    return () => (timer != null ? clearTimeout(timer) : undefined)
  }, [copied, setCopied])

  useEffect(() => {
    if (_tiles === "" && tiles !== "") return

    setTiles(_tiles)
  }, [_tiles, tiles, setTiles])

  if (gameStarted) return null
  if (!gameStarted && tiles == null) return null

  return (
    <div className="board__share">
      <button
        className="board__button board__button--share"
        name="share"
        type="button"
        disabled={copied}
        onClick={shareClick}
      >
        <ShareIcon />
      </button>
      <p>
        {copied ? "Copied link to cliploard!" : "Share this game with friends"}
      </p>
    </div>
  )
}

export default Challenge
