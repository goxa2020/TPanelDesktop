import NavButton from "./NavButton";
import {useContext} from "react";
import AuthContext from "../../context/AuthContext";

export default function LogInOutButton() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <>
      {user ? <li className="nav-link">
        <button onClick={logoutUser}>
          <i className="bx bx-log-out icon"></i>
          <span className="text nav-text">Выйти</span>
        </button>
      </li> : <NavButton iconName="bx-log-in" href="/login" text="Войти" SPA />}
    </>
  )
}