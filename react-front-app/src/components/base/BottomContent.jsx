import { store } from "../../themes.js";
import NavButton from "./NavButton.jsx";
import PrivateNavButton from "./PrivateNavButton";

export default function BottomContent() {
  function switchClicked() {
    const body = document.querySelector("body");
    store(body.classList.toggle("dark").toString());
    // body.classList.toggle("dark")
  }
  return (
    <div className="bottom-content">
      <ul>
        <PrivateNavButton
          iconName="bx-user"
          href="/profile"
          text="Профиль"
          SPA
        />
        <li className="nav-link">
          <form action="/logout" method="post" className="SPA-form">
            <button type="submit">
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Выйти</span>
            </button>
          </form>
        </li>
        <NavButton iconName="bx-log-in" href="/login" text="Войти" SPA />
        <li className="mode">
          <div className="sun-moon">
            <i className="bx bx-moon icon moon"></i>
            <i className="bx bx-sun icon sun"></i>
          </div>
          <span className="mode-text text">Темная тема</span>
          <div className="toggle-switch" onClick={switchClicked}>
            <span className="switch"></span>
          </div>
        </li>
      </ul>
    </div>
  );
}
