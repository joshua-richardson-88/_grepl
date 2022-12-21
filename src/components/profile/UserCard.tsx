import { ChangeEvent, FormEvent, useRef, useState } from "react"
import useClickOutside from "../../hooks/useClickOutside"
import useToggle from "../../hooks/useToggle"
import userStore from "./data/store"
import { SunIcon, UserIcon } from "./icons"

const ActionMenuIcon = () => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
  </svg>
)
const ActionMenu = ({ clear, edit }: MenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, toggleOpen] = useToggle(false)

  const handleClick = (isClear: boolean) => {
    toggleOpen(false)
    if (isClear) clear()
    else edit()
  }

  useClickOutside(menuRef, () => toggleOpen(false))

  return (
    <div ref={menuRef} className="actionMenu__container">
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="user-menu"
        className="actionMenu__button"
        onClick={() => toggleOpen()}
        role="menubar"
        type="button"
      >
        <span className="sr-only">Open User menu</span>
        <ActionMenuIcon />
      </button>
      <div className="actionMenu__form" id="user-menu">
        <p className="actionMenu__form-item" onClick={() => handleClick(false)}>
          Edit
        </p>
        <p className="actionMenu__form-item" onClick={() => handleClick(true)}>
          Clear Data
        </p>
      </div>
    </div>
  )
}
const EditableField = ({ editing, initState, update }: EditableFieldProps) => {
  const [state, setState] = useState(initState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState(e.currentTarget.value)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    update(state)
  }

  return (
    <>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            autoComplete="off"
            className="editable__input"
            name="username"
            value={state}
            type="text"
            onChange={handleChange}
          />
        </form>
      ) : (
        <h5 className="editable__text">{state}</h5>
      )}
    </>
  )
}
const ThemeSwitcher = () => {
  const theme = userStore().theme
  const updateTheme = userStore().setTheme

  return (
    <form>
      <label htmlFor="light" onClick={() => updateTheme("light")}>
        <SunIcon />
      </label>
      <input className="" id="light" name="toggle-theme" type="radio" />
      <label></label>
      <input />
    </form>
  )
}

const UserCard = () => {
  const [editMode, setEditMode] = useToggle(false)

  const username = userStore().username
  const id = userStore().id

  const updateUser = userStore().updateUsername
  const clearUser = userStore().clearProfile

  const update = (s: string) => {
    updateUser(s)
    setEditMode(false)
  }

  return (
    <div className="userCard">
      <ActionMenu clear={clearUser} edit={setEditMode} />
      <div className="userCard__content">
        <UserIcon />
        <div>
          <EditableField
            editing={editMode}
            initState={username}
            update={update}
          />
          <span className="userCard__id">{`#${id}`}</span>
        </div>
      </div>
    </div>
  )
}
export default UserCard

type VoidFn = () => void
type MenuProps = { clear: VoidFn; edit: VoidFn }
type EditableFieldProps = {
  editing: boolean
  initState: string
  update: (s: string) => void
}
