import { type AppType } from "next/app"
import { useEffect } from "react"

import { trpc } from "../utils/trpc"

import "../styles/globals.css"
import "../styles/play.css"
import "../styles/profile.css"
import "../styles/themes.css"
import "../styles/tokens.css"
import "../styles/utilities.css"

type ColorMode = "light" | "dark"

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    const getInitialColorMode = (): ColorMode => {
      const persistedColorPreference = window.localStorage.getItem("color-mode")
      const hasPersistedPreference =
        typeof persistedColorPreference === "string" &&
        (persistedColorPreference === "light" ||
          persistedColorPreference === "dark")

      if (hasPersistedPreference) return persistedColorPreference

      const mql = window.matchMedia("(prefers-color-scheme: dark)")
      const hasMediaQueryPreference = typeof mql.matches === "boolean"

      if (hasMediaQueryPreference) return mql.matches ? "dark" : "light"
      return "light"
    }

    document.documentElement.className = getInitialColorMode()
  }, [])
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
