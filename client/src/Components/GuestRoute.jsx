import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "../store/AuthStore.js"


const GuestRoute = () => {

    const { userData } = AuthStore();
    console.log(userData);

    if (userData) {
        return <Navigate to="/dashboard" />
    }

    return <Outlet />;
}

export default GuestRoute
