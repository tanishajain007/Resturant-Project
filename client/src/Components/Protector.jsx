import { Navigate, Outlet } from "react-router-dom"
import AuthStore from '../store/AuthStore'

const Protector = () => {
  const { userData } = AuthStore();

  console.log(userData);

  if (!userData) {
    return <Navigate to="/" />
  }
  else {
    return <Outlet />
  }
}

export default Protector
