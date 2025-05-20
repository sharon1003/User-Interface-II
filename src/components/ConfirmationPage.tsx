import { useLocation, Link } from 'react-router-dom';
import { CartItem } from './CartContext.tsx';  // adjust path
import { useTranslation } from "react-i18next";

const ConfirmationPage = () => {
    const { t } = useTranslation();
    const { state } = useLocation() as {
        state: {
            orderNo: string;
            cartItems: CartItem[];
            total: number;
            method: string;
        };
    };

    if (!state) return <p>No order found.</p>;

    return (
        <div className="max-w-md mx-auto text-center mt-12">
            <h1 className="text-2xl font-semibold mb-4">
                ✅ {t("confirmation.success")}
            </h1>

            <p className="mb-2">
                <strong>{t("confirmation.order")}</strong> {state.orderNo}
            </p>
            <p className="mb-4 capitalize">
                <strong>{t("confirmation.method")}</strong> {state.method}
            </p>

            <ul className="text-left mb-4">
                {state.cartItems.map(item => {
                    /* convert "$12.00" → 12  (skip this if price is already a number) */
                    const unit = parseFloat(item.price.replace('$', ''));
                    const lineTotal = unit * item.quantity;

                    return (
                        <li key={item.id} className="flex justify-between">
                            {/* use the property that really exists in ProductProps */}
                            <span>{item.quantity}× {item.title}</span>
                            <span>${lineTotal.toFixed(2)}</span>
                        </li>
                    );
                })}
            </ul>

            <p className="font-semibold mb-6">
                {t("confirmation.total")} ${state.total.toFixed(2)}
            </p>

            <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded">
                {t("confirmation.backHome")}
            </Link>
        </div>
    );
};

export default ConfirmationPage;