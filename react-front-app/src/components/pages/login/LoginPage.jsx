import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";
import s from './login.module.css'
export default function LoginPage() {
  const {loginUser} = useContext(AuthContext)
  const handleSubmit = e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    email.length > 0 && loginUser(email, password)

  }
  return (
    <>

        <div className={s.container}>
            <h2 className={s.H2}>Авторизация</h2>
            <form className={s.Form} onSubmit={handleSubmit}>
                <label className={s.Label} htmlFor="uname"><b>Username</b></label>
                <input className={s.Input} type="email" placeholder="Enter email" id="email" required />

                <label className={s.Label} htmlFor="psw"><b>Password</b></label>
                <input className={s.Input} type="password" placeholder="Enter password" id="password" required />

                <button className={s.Button} type="submit">Войти</button>
            </form>
        </div>
    </>
  );
}
