import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoodStore from "../../store/FoodStore.js";
import Header from "../../Components/Header.jsx";
import Footer from "../../Components/Footer.jsx";

const Dashboard = () => {

  const navigate = useNavigate();

  const { foodData, getAllFood } = FoodStore();

  useEffect(() => {
    getAllFood();
  }, []);

  const totalFood = foodData?.length || 0;

  const availableFood =
    foodData?.filter((food) => food.isavailable).length || 0;

  const unavailableFood =
    foodData?.filter((food) => !food.isavailable).length || 0;


  return (
    <div className="min-h-screen bg-gray-100">

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back! Manage your Foodie application from here.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


          {/* Total Food */}
          <div className="bg-white rounded-2xl p-6 shadow-md border">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Total Food
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {totalFood}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                🍔
              </div>

            </div>

          </div>


          {/* Available */}
          <div className="bg-white rounded-2xl p-6 shadow-md border">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Available
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  {availableFood}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                🟢
              </div>

            </div>

          </div>


          {/* Unavailable */}
          <div className="bg-white rounded-2xl p-6 shadow-md border">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Unavailable
                </p>

                <h2 className="text-3xl font-bold text-red-600 mt-2">
                  {unavailableFood}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl">
                🔴
              </div>

            </div>

          </div>


          {/* Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-md border">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Total Orders
                </p>

                <h2 className="text-3xl font-bold text-blue-600 mt-2">
                  0
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                📦
              </div>

            </div>

          </div>

        </div>


        {/* ================= QUICK ACTIONS ================= */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Quick Actions
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


            {/* Create Menu */}
            <button
              onClick={() => navigate("/admin/create-menu")}
              className="
                bg-white
                p-6
                rounded-2xl
                shadow-md
                border
                text-left
                hover:shadow-xl
                hover:-translate-y-1
                transition
              "
            >

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  ➕
                </div>

                <div>

                  <h3 className="text-lg font-bold text-gray-800">
                    Create New Menu
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Add a new food item to your menu.
                  </p>

                </div>

              </div>

            </button>


            {/* See Menu */}
            <button
              onClick={() => navigate("/admin/explore")}
              className="
                bg-white
                p-6
                rounded-2xl
                shadow-md
                border
                text-left
                hover:shadow-xl
                hover:-translate-y-1
                transition
              "
            >

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  📋
                </div>

                <div>

                  <h3 className="text-lg font-bold text-gray-800">
                    See All Menu
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    View, edit and delete food items.
                  </p>

                </div>

              </div>

            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default Dashboard;