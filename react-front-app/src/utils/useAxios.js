import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const BaseUrl = 'http://127.0.0.1:8000/api/'

const useAxios = () => {
    const {authToken, setUser, setAuthToken} = useContext(AuthContext)

    const axiosInstance = axios.create({
        BaseUrl,
        headers: {Authorization: `Bearer ${authToken?.access}`}
    })

    axiosInstance.interceptors.request.use(async req => {
        
    })
}