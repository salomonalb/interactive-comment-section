import CommentForm from "./components/CommentForm"
import { createContext, useState } from "react"
import { user, usersArray } from "./context/usersArray"

export const CurrentUser = createContext({} as user)

export function App() {

  const [currentUser, setCurrentUser] = useState(usersArray[0])

  function changeUser(event: React.MouseEvent<HTMLButtonElement>): void {
    const index = Number((event.target as HTMLButtonElement).value)
    setCurrentUser(usersArray[index])
  }

  return (
    <>
    <button value={0} onClick={changeUser}>Amy</button>
    <button value={1} onClick={changeUser}>Max</button>
    <button value={2} onClick={changeUser}>Ramses</button>
    <button value={3} onClick={changeUser}>Julius</button>
      <CurrentUser.Provider value={currentUser}>
        {currentUser.username}
        <CommentForm />
      </CurrentUser.Provider>
    </>
  )
}
