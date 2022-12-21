import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { isSSR } from "../utils/isSSR"

type Props = { children: ReactNode }
const Portal = ({ children }: Props) => {
  const ref = useRef<Element | null>(null)

  useEffect(() => {
    if (!isSSR) document.querySelector<HTMLElement>("#portal")
  }, [isSSR])

  return !isSSR && ref.current
    ? createPortal(<div className="overlay">{children}</div>, ref.current)
    : null
}

export default Portal
