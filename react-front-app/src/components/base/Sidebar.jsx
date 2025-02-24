import Header from "./Header";
import MenuBar from "./MenuBar";
import { useState } from "react";

export default function Sidebar() {
  const [closed, setClosedness] = useState(true)

  return (
    <nav className={`sidebar ${closed ? "close" : ''}`}>
      <Header state={[closed, setClosedness]}/>
      <MenuBar />
    </nav>
  );
}
