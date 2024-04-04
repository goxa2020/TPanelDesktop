import logo_min_light from "../../logo_min_light.svg";
import logo_min_dark from "../../logo_min_dark.svg";

export default function Header({ state }) {
  const [closed, setClosedness] = state;

  function chevronClicked() {
    closed ? setClosedness(false) : setClosedness(true);
  }

  return (
    <header>
      <div className="image-text">
        <div className="image">
          <img src={logo_min_light} alt="logo_min" className="logo-min-light"/>
          <img src={logo_min_dark} alt="logo_min_dark" className="logo-min-dark"/>
        </div>
        <div className="text logo-text">
          <span className="name">TPanel</span>
        </div>
      </div>
      <i className="bx bx-chevron-right toggle" onClick={chevronClicked}></i>
    </header>
  );
}
