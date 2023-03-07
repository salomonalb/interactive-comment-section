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
      <li className="header__menu-item">
        <button
          className={`header__button ${user.username === currentUser.username ? "--active" : null }`}
          key={user.username}
          value={index}
          onClick={changeUser}
        >
          <img
            className="header__avatar"
            src={user.avatar}
            alt={`${user.username} avatar`}
          />
          <p className="header__username">{user.username}</p>
        </button>
      </li>
    );
  });

  return (
    <>
      <header className="header">
        <p className="header__text">Change User:</p>
        <menu className="header__menu">{buttonElements}</menu>
      </header>
      <CurrentUser.Provider value={currentUser}>
        {children}
      </CurrentUser.Provider>
    </>
  );
}

export default CurrentUserProvider;
