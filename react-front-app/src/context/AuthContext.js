import {createContext, useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode";
import {BaseUrl} from "../utils/useAxios";
const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {

    const notify = (title, icon) => {
        swal.fire({
            title: title,
            icon: icon,
            toast: true,
            timer: 4500,
            position: 'top-end',
            timerProgressBar: true,
            showConfirmButton: false,
            color: 'var(--text-color)',
            background: 'var(--sidebar-color)'
        })
    };

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
        const response = await fetch(`${BaseUrl}/token/`, {
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
            notify("Авторизация успешна", "success")

        } else {
            notify("Имя пользователя или пароль введён не верно", "error")
        }
    }

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch(`${BaseUrl}/register/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            notify("Registration Successful, Login Now", "success")
        } else {
            notify("Произошла ошибка " + response.status, "error")
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        notify("Вы вышли из аккаунта...", "success")
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