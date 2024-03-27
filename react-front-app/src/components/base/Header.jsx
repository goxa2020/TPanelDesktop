export default function Header({ state }) {
  const [closed, setClosedness] = state;

  function chevronClicked() {
    closed ? setClosedness(false) : setClosedness(true);
  }
  
  return (
    <header>
      <div className="image-text">
        <div className="text logo-text">
          <span className="name">TPanel</span>
        </div>
      </div>
      <i className="bx bx-chevron-right toggle" onClick={chevronClicked}></i>
    </header>
  );
}
