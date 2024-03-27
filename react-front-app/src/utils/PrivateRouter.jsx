import { Navigate, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);
  // return <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
