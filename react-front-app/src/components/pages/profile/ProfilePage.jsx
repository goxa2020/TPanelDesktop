import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h3>Привет, {user.username}</h3>
      <p>Здравствуйте, {user.full_name}</p>
    </>
  )
}