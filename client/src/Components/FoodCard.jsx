import OrderStore from "../store/OrderStore.js";


const FoodCard = ({ food }) => {

    const { addToCart } = OrderStore();

    return (
        <div className="
            w-full
            h-120
            bg-white
            rounded-2xl
            shadow-md
            overflow-hidden
            border
            border-gray-200
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            flex
            flex-col
        ">

            {/* Image */}
            <div className="relative">

                <img
                    src={food.images?.[0]}
                    alt={food.name}
                    className="
                        w-full
                        h-50
                        object-cover
                    "
                />

                {/* Availability */}
                <span
                    className={`
                        absolute
                        top-3
                        right-3
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                        shadow-md
                        ${food.isavailable
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }
                    `}
                >
                    {food.isavailable
                        ? "Available"
                        : "Not Available"}
                </span>

            </div>


            {/* Content */}
            <div className="p-4 flex flex-col flex-1">

                {/* Name + Price */}
                <div className="
                    flex
                    justify-between
                    items-start
                    gap-3
                    mb-2
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        text-gray-800
                        leading-5
                    ">
                        {food.name}
                    </h2>

                    <span className="
                        text-lg
                        font-bold
                        text-orange-500
                        whitespace-nowrap
                    ">
                        ₹{food.price}
                    </span>

                </div>


                {/* Category */}
                <span className="
                    self-start
                    bg-orange-100
                    text-orange-600
                    px-4
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    mb-4
                ">
                    {food.category}
                </span>


                {/* Description */}
                <div className="mb-4">

                    <h3 className="
                        text-sm
                        font-semibold
                        text-gray-700
                        mb-1
                    ">
                        Description
                    </h3>

                    <p className="
                        text-gray-500
                        text-sm
                        leading-6
                        line-clamp-3
                    ">
                        {food.discription ||
                            food.description ||
                            "No description available"}
                    </p>

                </div>


                {/* Add To Cart */}
                <button
                    disabled={!food.isavailable}
                    onClick={() => addToCart(food)}
                    className={`
                        w-full
                        mt-auto
                        py-3
                        rounded-xl
                        font-semibold
                        transition-all
                        duration-300
                        ${food.isavailable
                            ? "bg-orange-500 hover:bg-orange-600 hover:shadow-lg text-white cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                    `}
                >
                    {food.isavailable
                        ? "Add to Cart 🛒"
                        : "Unavailable"}
                </button>

            </div>

        </div>
    );
};

export default FoodCard;