import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoodStore from "../../store/FoodStore.js";

const ExploreAdmin = () => {
    const navigate = useNavigate();

    const { foodData, getAllFood, deleteFoodMenu } = FoodStore();

    console.log(foodData);

    useEffect(() => {
        getAllFood();
    }, []);


    return (
        <div className="min-h-screen bg-gray-100">

            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-6 pt-8">

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            See All Menu
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage all food items available in your menu
                        </p>
                    </div>

                </div>

                {/* Table Container */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1100px]">

                            {/* Table Header */}
                            <thead>
                                <tr className="bg-gray-900 text-white">

                                    <th className="px-5 py-4 text-left">
                                        Image
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Name
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Description
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Category
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Price
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Availability
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>

                                {foodData && foodData.length > 0 ? (

                                    foodData.map((food) => (

                                        <tr
                                            key={food._id}
                                            className="border-b hover:bg-gray-50 transition"
                                        >

                                            {/* Image */}
                                            <td className="px-5 py-4">

                                                <img
                                                    src={
                                                        food.images?.[0]
                                                            ? food.images[0]
                                                            : "https://via.placeholder.com/80"
                                                    }
                                                    alt={food.name}
                                                    className="w-16 h-16 object-cover rounded-xl border"
                                                />

                                            </td>

                                            {/* Name */}
                                            <td className="px-5 py-4">

                                                <p className="font-semibold text-gray-800">
                                                    {food.name}
                                                </p>

                                            </td>

                                            {/* Description */}
                                            <td className="px-5 py-4 max-w-xs">

                                                <p className="text-gray-600 line-clamp-2">
                                                    {food.discription ||
                                                        "No description available"}
                                                </p>

                                            </td>

                                            {/* Category */}
                                            <td className="px-5 py-4">

                                                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                                                    {food.category}
                                                </span>

                                            </td>

                                            {/* Price */}
                                            <td className="px-5 py-4">

                                                <span className="font-bold text-gray-800">
                                                    ₹{food.price}
                                                </span>

                                            </td>

                                            {/* Availability */}
                                            <td className="px-5 py-4">

                                                {food.isavailable ? (

                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                        Available
                                                    </span>

                                                ) : (

                                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                        Unavailable
                                                    </span>

                                                )}

                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">

                                                <div className="flex justify-center gap-3">

                                                    {/* Edit */}
                                                    <button
                                                        title="Edit Food"
                                                        onClick={() =>
                                                            navigate(`/admin/create-menu/${food._id}`)
                                                        }
                                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 15.07a4.5 4.5 0 01-1.897 1.13L6 17l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.932z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 7.5L16.5 4.5"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        data-food-id={food._id}
                                                        onClick={(e) => {
                                                            deleteFoodMenu(e.currentTarget.dataset.foodId)
                                                                .then(() => getAllFood());
                                                        }}
                                                        title="Delete Food"
                                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 7.5h12M9.75 7.5V5.25A1.25 1.25 0 0111 4h2a1.25 1.25 0 011.25 1.25V7.5m-6 0v11.25A1.25 1.25 0 009.5 20h5a1.25 1.25 0 001.25-1.25V7.5M10 11v5m4-5v5"
                                                            />
                                                        </svg>
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-12 text-gray-500"
                                        >
                                            No food items found.
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ExploreAdmin;