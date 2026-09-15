import { Outlet } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">

            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

export default DashboardLayout;