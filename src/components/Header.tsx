import Link from "next/link"
import { useEffect, useState } from "react"

import { isSSR } from "../utils/isSSR"
import { env } from "../env/client.mjs"
import { User } from "@passageidentity/passage-js"

const user = new User()

const LoginMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(user.authGuard())
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen((p) => !p)
  const signOut = () => {
    user.signOut()
    setIsLoggedIn(false)
  }

  return isLoggedIn ? (
    <button
      role="menuitem"
      id="login_menu_button"
      className="nav__link--login"
      onClick={signOut}
    >
      Sign Out
    </button>
  ) : (
    <button
      role="menuitem"
      aria-haspopup="true"
      aria-expanded={isOpen}
      aria-controls="login_form"
      className="nav__link--login"
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

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth")
    if (!isSSR) setIsClient(true)
  }, [])

  return (
    <header>
      <nav aria-label="Grepl Game" role="menubar" className="nav">
        <Link href="/" role="menuitem">
          <h1 className="nav__link nav__link--logo">
            <span className="nav__link--letter-g">G</span>
            <span className="nav__link--letter-r">r</span>
            <span className="nav__link--letter-e">e</span>
            <span className="nav__link--letter-p">p</span>
            <span className="nav__link--letter-l">l</span>
          </h1>
        </Link>
        <div className="nav__link-group">
          <Link href="/play">
            <span className="nav__link nav__link--play">Play</span>
          </Link>
          <Link href="/profile">
            <span className="nav__link">Profile</span>
          </Link>
          {isClient && <LoginMenu />}
        </div>
        <div
          id="login-form"
          role="menu"
          className="nav__modal"
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
