// src/pages/Cart.tsx
import { useTranslation } from "react-i18next";
import { useCart } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, clearCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="bg-[#f5f3ea] min-h-screen">
      <div className="p-8 max-w-3xl mx-auto">
        <div className="relative mb-6">
          <h1 className="text-2xl font-bold text-center">
            🛒 {t("cart.title")}
          </h1>
          <button
            onClick={clearCart}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Clear Cart
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">{t("cart.empty")}</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded shadow p-4 flex justify-between items-center"
                >
                  {/* Image Section */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />

                  {/* Content Section */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price Section */}
                  <span className="text-green-700 font-bold">
                    $
                    {(
                      parseFloat(item.price.replace("$", "")) * item.quantity
                    ).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <p className="text-xl font-semibold mb-4">
                {t("cart.total")}: ${total.toFixed(2)}
              </p>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                onClick={() => navigate("/payment")}
              >
                {t("cart.pay")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
