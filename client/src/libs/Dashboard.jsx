import AuthStore from "../store/AuthStore"
import AdminDashboard from "../Pages/Admin/Dashboard"
import UserDashboard from "../Pages/User/Dashboard"

const Dashboard = () => {
  const { isAdmin } = AuthStore()

  if (isAdmin == "admin") {
    return <AdminDashboard />;
  }
  else if (isAdmin == "user") {
    return <UserDashboard />;
  }
  else {
    return (<h1>Login Failed</h1>)
  }
}

export default Dashboard
