import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import NavButton from "./NavButton";

export default function PrivateNavButton({ reverse, children, ...rest }) {
  let { user } = useContext(AuthContext);
  if (!user) return null;
  return <NavButton {...rest}>{children}</NavButton>;
}
