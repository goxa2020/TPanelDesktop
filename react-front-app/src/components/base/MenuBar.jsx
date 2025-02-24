import MenuLinks from "./MenuLinks";
import BottomContent from "./BottomContent";

export default function MenuBar() {
  return (
    <div className="menu-bar">
      <div className="menu">
        <MenuLinks />
      </div>
      <BottomContent />
    </div>
  );
}
