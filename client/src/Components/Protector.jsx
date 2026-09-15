import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "../store/AuthStore.js";

const Protector = () => {

    const { userData } = AuthStore();

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default Protector;