// src/pages/PaymentPage.tsx
import {useCart} from "../components/CartContext";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const PaymentPage = () => {
    const {cartItems, clearCart} = useCart();
    const {t} = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [swishNumber, setSwishNumber] = useState("");

    const total = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return sum + price * (item.quantity || 1);
    }, 0);

    const handlePayment = () => {
        alert(t("payment.success")); // Replace with real integration
        clearCart();
    };

    return (
        <div className="bg-[#f5f3ea] min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">💳{t("payment.title")}</h1>

                <div className="mb-4">
                    <h2 className="font-semibold mb-2">{t("payment.method")}</h2>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="credit">Credit Card 💳</option>
                        <option value="swish">Swish</option>
                    </select>

                    {paymentMethod === "swish" && (
                        <div className="mt-4">
                            <label className="block font-medium mb-1">{t("payment.swishPhone")}</label>
                            <input
                                type="tel"
                                value={swishNumber}
                                onChange={(e) => setSwishNumber(e.target.value)}
                                placeholder="070-123 45 67"
                                className="border rounded p-2 w-full"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-4 text-right font-bold text-lg">
                    {t("payment.total")}: ${total.toFixed(2)}
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    {t("payment.payNow")}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;