import { USERS_ARRAY } from "../constants/USERS_ARRAY";
import { ReactNode, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";

type CurrentUserProviderProps = {
  children: ReactNode;
};

function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState(USERS_ARRAY[0]);

  function changeUser(event: React.MouseEvent<HTMLButtonElement>): void {
    const index = Number((event.currentTarget as HTMLButtonElement).value);
    setCurrentUser(USERS_ARRAY[index]);
  }
  const buttonElements = USERS_ARRAY.map((user, index) => {
    return (
      <li>
        <button key={user.username} value={index} onClick={changeUser}>
          <img src={user.avatar} alt={`${user.username} avatar`} />
          <p>{user.username}</p>
        </button>
      </li>
    );
  });

  return (
    <>
      <header>
        <p>Change User:</p>
        <menu>
          {buttonElements}
        </menu>
      </header>
      
      <CurrentUser.Provider value={currentUser}>
        {children}
      </CurrentUser.Provider>
    </>
  );
}

export default CurrentUserProvider;
