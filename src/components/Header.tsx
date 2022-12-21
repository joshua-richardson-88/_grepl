import Link from "next/link"
import { useEffect, useState } from "react"

import { isSSR } from "../utils/isSSR"
import { env } from "../env/client.mjs"
import styles from "./Header.module.css"
import { Passage, User } from "@passageidentity/passage-js"

const auth = new Passage(env.NEXT_PUBLIC_PASSAGE_APP_ID)
const user = new User()

type LoginMenuProps = { open: boolean; toggle: () => void }
const LoginMenu = ({ open, toggle }: LoginMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(user.authGuard())
  const signOut = () => {
    user.signOut()
    setIsLoggedIn(false)
  }

  return isLoggedIn ? (
    <button role="menuitem" className={styles.login__button} onClick={signOut}>
      Sign Out
    </button>
  ) : (
    <button
      role="menuitem"
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls="login_form"
      className={styles.login__button}
      id="login_menu_button"
      onClick={toggle}
    >
      Login
    </button>
  )
}
const LoginForm = () => {
  return <div></div>
}

const Header = () => {
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen((p) => !p)

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth")
    if (!isSSR) setIsClient(true)
  }, [])

  return (
    <header role="banner">
      <nav
        aria-label="Grepl Game"
        role="menubar"
        className={`${styles.nav} flex-group`}
      >
        <Link href="/" role="menuitem">
          <h1 className={`${styles.link} ${styles.logo}`}>
            <span className={styles.logo__g}>G</span>
            <span className={styles.logo__r}>r</span>
            <span className={styles.logo__e}>e</span>
            <span className={styles.logo__p}>p</span>
            <span className={styles.logo__l}>l</span>
          </h1>
        </Link>
        <div className="flex-group gap-4">
          <Link href="/play">
            <span className={styles.link__play}>Play</span>
          </Link>
          <Link href="/profile">
            <span className={styles.link}>Profile</span>
          </Link>
          {isClient && <LoginMenu open={isOpen} toggle={toggleOpen} />}
        </div>
        <div
          id="login-form"
          role="menu"
          className={`${styles.login__form}${
            isOpen ? ` ${styles.active}` : ""
          }`}
          aria-labelledby="login_menu_button"
        >
          {isClient && (
            <passage-auth
              app-id={env.NEXT_PUBLIC_PASSAGE_APP_ID}
            ></passage-auth>
          )}
        </div>
      </nav>
    </header>
  )
}
export default Header
