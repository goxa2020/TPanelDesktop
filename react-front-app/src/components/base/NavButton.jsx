import { NavLink } from "react-router-dom";


export default function NavButton({ iconName, href, text, SPA }) {
  const aclasses = SPA ? "SPA-link" : ""
  const iclasses = "bx icon " + iconName;
  return (
    <li className="nav-link">
      <NavLink to={href} className={aclasses}>
        <i className={iclasses}></i>
        <span className="text nav-text">{text}</span>
      </NavLink>
    </li>
  );
}
