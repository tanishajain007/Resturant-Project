import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Pages/Home.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Dashboard from './libs/Dashboard.jsx';
import Protector from './Components/Protector.jsx';
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Explore from "./Pages/User/Explore.jsx";
import GuestRoute from "./Components/GuestRoute.jsx";
import RoleRouter from "./Components/RoleRouter.jsx";
import ExploreAdmin from "./Pages/Admin/Explore.jsx";
import CreateMenu from "./Pages/Admin/CreateMenu.jsx";
import Cart from "./Pages/User/Cart.jsx";
import Orders from "./Pages/User/Orders.jsx";
import OrdersPage from "./Pages/Admin/OrderPage.jsx";

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route element={<GuestRoute />}>
                        <Route path="/signup" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    {/* <Route path="/explore" element={<Explore />} /> */}
                    <Route element={<Protector />}>
                        {/* <Route
                            path="/dashboard"
                            element={
                                <>
                                    <Header />
                                    <Dashboard />
                                    <Footer />
                                </>
                            }
                        /> */}
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<Explore />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="order-history" element={<Orders />} />
                        </Route>
                        <Route path="/admin" element={<RoleRouter />}>
                            <Route path="explore" element={
                                <>
                                    <Header />
                                    <ExploreAdmin />
                                    <Footer />
                                </>
                            } />
                            <Route path="create-menu" element={
                                <>
                                    <Header />
                                    <CreateMenu />
                                    <Footer />
                                </>
                            } />
                            <Route
                                path="create-menu/:id"
                                element={
                                    <>
                                        <Header />
                                        <CreateMenu />
                                        <Footer />
                                    </>
                                }
                            />
                            <Route
                                path="order-history"
                                element={
                                    <>
                                        <Header />
                                        <OrdersPage />
                                        <Footer />
                                    </>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default AppRouter
