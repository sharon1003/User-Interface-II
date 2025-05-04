// src/pages/Cart.tsx
import { useTranslation } from "react-i18next";
import {useCart} from "../components/CartContext";

const Cart = () => {
    const { t } = useTranslation();
    const {cartItems, clearCart, increaseQuantity, decreaseQuantity} = useCart();

    const total = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return sum + price * item.quantity;
    }, 0);

    return (
        <div className="bg-[#f5f3ea] min-h-screen">
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">🛒 {t("cart.title")}</h1>
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
                                <div>
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
                                <span className="text-green-700 font-bold">
        ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
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
                            onClick={clearCart}
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
