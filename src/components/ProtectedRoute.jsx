import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ( { children } ) => {
    const token = Cookies.get("token");
    //console.log(token);

    return <>
        {token ? children : <Navigate to="/login" />}
    </>
};

export default ProtectedRoute;