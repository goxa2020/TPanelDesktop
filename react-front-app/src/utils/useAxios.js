import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const BaseUrl = "http://127.0.0.1:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthToken } = useContext(AuthContext);

  const axiosInstance = axios.create({
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) > 1;

    if (!isExpired) return req;

    const response = await axios.post(`${BaseUrl}/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authToken", JSON.stringify(response.data));

    setAuthToken(response.data);
    setUser(jwtDecode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });
  return axiosInstance;
};

export default useAxios;
