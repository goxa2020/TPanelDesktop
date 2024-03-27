import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

export default function LoginPage() {
  let { loginUser } = useContext(AuthContext);
  return (
    <>
      <h3>qwerty</h3>

        <form method="POST">
            <input type="email"/>
            <input type="password"/>
            <button onClick={() => {
                loginUser()
            }}
            ></button>
        </form>
    </>
  );
}
