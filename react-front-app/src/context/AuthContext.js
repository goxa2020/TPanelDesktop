import {createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );


    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );


    const [loading, setLoading] = useState(true);

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            swal.fire({
                title: "Авторизация успешна",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

        } else {
            swal.fire({
                title: "Имя пользователя или пароль введён не верно",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            swal.fire({
                title: "Произошла ошибка " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        swal.fire({
            title: "Вы вышли из аккаунта...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}