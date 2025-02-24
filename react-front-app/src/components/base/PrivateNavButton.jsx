import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import NavButton from "./NavButton";

export default function PrivateNavButton({ children, ...rest }) {
  let { user } = useContext(AuthContext);
  return user && <NavButton {...rest}>{children}</NavButton>;
}
