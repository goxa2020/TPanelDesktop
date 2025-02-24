import { store } from "../../themes.js";
import PrivateNavButton from "./PrivateNavButton";
import LogInOutButton from "./LogInOutButton";

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
        <LogInOutButton />
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
