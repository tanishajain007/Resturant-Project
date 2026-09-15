import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import HomePage from "./Pages/Home.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";

import Protector from "./Components/Protector.jsx";
import GuestRoute from "./Components/GuestRoute.jsx";
import RoleRouter from "./Components/RoleRouter.jsx";

import DashboardLayout from "./libs/DashboardLayout.jsx";
import AdminLayout from "./libs/AdminLayout.jsx";

// USER
import Explore from "./Pages/User/Explore.jsx";
import Cart from "./Pages/User/Cart.jsx";
import Orders from "./Pages/User/Orders.jsx";

// ADMIN
import AdminDashboard from "./Pages/Admin/Dashboard.jsx";
import ExploreAdmin from "./Pages/Admin/Explore.jsx";
import CreateMenu from "./Pages/Admin/CreateMenu.jsx";
import OrdersPage from "./Pages/Admin/OrderPage.jsx";


const AppRouter = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* ================= HOME ================= */}

                <Route
                    path="/"
                    element={<HomePage />}
                />


                {/* ================= GUEST ================= */}

                <Route element={<GuestRoute />}>

                    <Route
                        path="/signup"
                        element={<Register />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                </Route>


                {/* ================= PROTECTED ================= */}

                <Route element={<Protector />}>


                    {/* ================= USER ================= */}

                    <Route
                        path="/dashboard"
                        element={<DashboardLayout />}
                    >

                        <Route
                            index
                            element={<Explore />}
                        />

                        <Route
                            path="cart"
                            element={<Cart />}
                        />

                        <Route
                            path="order-history"
                            element={<Orders />}
                        />

                    </Route>


                    {/* ================= ADMIN ================= */}

                    <Route
                        path="/admin"
                        element={<RoleRouter />}
                    >

                        <Route
                            element={<AdminLayout />}
                        >

                            <Route
                                index
                                element={<AdminDashboard />}
                            />

                            <Route
                                path="explore"
                                element={<ExploreAdmin />}
                            />

                            <Route
                                path="create-menu"
                                element={<CreateMenu />}
                            />

                            <Route
                                path="create-menu/:id"
                                element={<CreateMenu />}
                            />

                            <Route
                                path="order-history"
                                element={<OrdersPage />}
                            />

                        </Route>

                    </Route>


                </Route>

            </Routes>

        </BrowserRouter>

    );
};

export default AppRouter;