import { useState } from 'react'

const useToggle = (init: boolean): [boolean, ToggleUpdateFn] => {
  const [state, setState] = useState(init)

  const update: ToggleUpdateFn = (b) => setState((p) => (b != null ? b : !p))

  return [state, update]
}
export default useToggle
export type ToggleUpdateFn = (b?: boolean) => void
