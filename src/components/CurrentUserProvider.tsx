
import { usersArray } from "../context/usersArray"
import { ReactNode, useState } from "react"
import { CurrentUser } from "../context/CurrentUser"

type CurrentUserProviderProps = {
    children: ReactNode[]
}

function CurrentUserProvider({ children }: CurrentUserProviderProps) {

    const [currentUser, setCurrentUser] = useState(usersArray[0])

    function changeUser(event: React.MouseEvent<HTMLButtonElement>): void {
        const index = Number((event.target as HTMLButtonElement).value)
        setCurrentUser(usersArray[index])
    }

    return (
    <div>
        Change User:
        <button value={0} onClick={changeUser}>Amy</button>
        <button value={1} onClick={changeUser}>Max</button>
        <button value={2} onClick={changeUser}>Ramses</button>
        <button value={3} onClick={changeUser}>Julius</button>
        <CurrentUser.Provider value={currentUser}>
            {children}
        </CurrentUser.Provider>
    </div>
    )
}

export default CurrentUserProvider