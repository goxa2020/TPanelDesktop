import { NavLink } from "react-router-dom";


export default function NavButton({ iconName, href, text }) {
  const iclasses = "bx icon " + iconName;
  return (
    <li className="nav-link">
      <NavLink to={href}>
        <i className={iclasses}></i>
        <span className="text nav-text">{text}</span>
      </NavLink>
    </li>
  );
}
