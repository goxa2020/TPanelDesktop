import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// если PrivateRouter даёт доступ только авторизованным пользователям, UnPrivateRouter наоборот, только неавторизованным
const UnPrivateRoute = ({ children }) => {
  let { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : children;
};

export default UnPrivateRoute;
