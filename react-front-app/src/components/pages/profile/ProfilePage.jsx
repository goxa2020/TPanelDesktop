import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  console.log(user)
  return (
    <>
      <h3>Привет, {user.username}</h3>
    </>
  )
}