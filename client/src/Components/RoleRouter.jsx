import { Navigate, Outlet } from "react-router-dom";
import AuthStore from "../store/AuthStore.js"


const RoleRouter = () => {
    
    const {isAdmin} = AuthStore();

    if(isAdmin=="admin"){
        return <Outlet/>
    }
    else{
        return <Navigate to="/" />
    }
}

export default RoleRouter
