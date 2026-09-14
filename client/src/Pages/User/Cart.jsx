import { Link } from "react-router-dom";
import OrderStore from "../../store/OrderStore.js";

const Cart = () => {
  const {
    CartItemData,
    cartCount,
    addToCart,
    removeToCart,
    removeItemFromCart,
    CreateOrder,
  } = OrderStore();

  const subtotal = CartItemData.reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity),
    0
  );

  const deliveryFee =
    CartItemData.length > 0 ? 40 : 0;

  const total = subtotal + deliveryFee;

  if (CartItemData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            {/* Cart Icon */}
            <div className="text-7xl mb-6">
              🛒
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-800">
              Your Cart is Empty
            </h1>

            {/* Description */}
            <p className="text-gray-500 mt-3">
              Looks like you haven't added
              anything to your cart yet.
            </p>

            {/* Browse Menu */}
            <Link
              to="/dashboard"
              className="inline-block mt-7
                                       bg-orange-500
                                       text-white
                                       px-7 py-3
                                       rounded-xl
                                       font-semibold
                                       hover:bg-orange-600
                                       transition
                                       shadow"
            >
              Browse Menu
            </Link>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Your Cart 🛒
          </h1>

          <p className="text-gray-500 mt-2">
            You have {cartCount} item
            {cartCount !== 1 ? "s" : ""} in
            your cart.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


          <div className="lg:col-span-2 space-y-5">

            {CartItemData.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-2xl
                                           shadow-sm p-5
                                           flex flex-col
                                           sm:flex-row
                                           sm:items-center
                                           gap-5"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-28
                                               h-28
                                               object-cover
                                               rounded-xl"
                />

                <div className="flex-1">

                  {/* Food Name */}
                  <h2 className="text-xl font-bold text-gray-800">
                    {item.name}
                  </h2>

                  {/* Food Price */}
                  <p className="text-orange-500 font-semibold mt-1">
                    ₹{item.price}
                  </p>


                  {/* =========================
                                        QUANTITY CONTROLS
                                    ========================= */}
                  <div className="flex items-center gap-4 mt-4">

                    {/* MINUS */}
                    <button
                      onClick={() =>
                        removeToCart(
                          item._id
                        )
                      }
                      className="w-9 h-9
                                                       rounded-lg
                                                       bg-gray-100
                                                       hover:bg-orange-100
                                                       text-gray-700
                                                       font-bold
                                                       text-lg
                                                       transition"
                    >
                      −
                    </button>


                    {/* QUANTITY */}
                    <span
                      className="font-bold
                                                       text-lg
                                                       min-w-5
                                                       text-center"
                    >
                      {item.quantity}
                    </span>


                    {/* PLUS */}
                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                      className="w-9 h-9
                                                       rounded-lg
                                                       bg-orange-500
                                                       text-white
                                                       font-bold
                                                       text-lg
                                                       hover:bg-orange-600
                                                       transition"
                    >
                      +
                    </button>

                  </div>

                </div>
                <div
                  className="flex
                                               sm:flex-col
                                               items-center
                                               sm:items-end
                                               justify-between
                                               gap-4"
                >

                  {/* Total Price */}
                  <p className="text-xl font-bold text-gray-800">
                    ₹
                    {Number(item.price) *
                      Number(
                        item.quantity
                      )}
                  </p>


                  {/* Remove Complete Item */}
                  <button
                    onClick={() =>
                      removeItemFromCart(
                        item._id
                      )
                    }
                    className="text-red-500
                                                   hover:text-red-700
                                                   font-medium
                                                   transition"
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="lg:col-span-1">

            <div
              className="bg-white
                                       rounded-2xl
                                       shadow-sm
                                       p-6
                                       sticky
                                       top-24"
            >

              {/* Heading */}
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4">

                <span className="text-gray-600">
                  Items
                </span>

                <span className="font-semibold text-gray-800">
                  {cartCount}
                </span>

              </div>

              <div className="flex justify-between mb-4">

                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold text-gray-800">
                  ₹{subtotal}
                </span>

              </div>

              <div className="flex justify-between mb-4">

                <span className="text-gray-600">
                  Delivery Fee
                </span>

                <span className="font-semibold text-gray-800">
                  ₹{deliveryFee}
                </span>

              </div>


              <div className="border-t pt-4 mt-4">

                <div className="flex justify-between">

                  <span className="text-xl font-bold text-gray-800">
                    Total
                  </span>

                  <span className="text-xl font-bold text-orange-500">
                    ₹{total}
                  </span>

                </div>

              </div>

              <button
                onClick={CreateOrder}
                className="w-full mt-6
                                           bg-orange-500
                                           text-white
                                           py-3
                                           rounded-xl
                                           font-semibold
                                           text-lg
                                           hover:bg-orange-600
                                           transition
                                           shadow"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/dashboard"
                className="block
                                           text-center
                                           mt-4
                                           text-orange-500
                                           font-semibold
                                           hover:text-orange-600
                                           transition"
              >
                ← Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;