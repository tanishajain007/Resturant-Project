import { Outlet } from "react-router-dom";
import Header from "../../Components/Header.jsx";
import Footer from "../../Components/Footer.jsx";
const Dashboard = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Dashboard;