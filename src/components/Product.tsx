import {useTranslation} from "react-i18next";

export type ProductProps = {
    id: string;
    category: string;
    image: string;
    price: string;
    title: string;
    description: string;
    onAddToCart?: (id: string) => void;
};

const Product = ({ id, category, image, price, title, description, onAddToCart }: ProductProps) => {
    const categoryLabels: Record<string, string> = {
        gelmanicure: "Gel Manicure",
        nailart: "Nail Art",
        naturalcare: "Natural Care",
    };
    const { t } = useTranslation();

    return (
        <div className="bg-[#fffefb] rounded-xl shadow-lg p-6 text-center">
            <img
                src={image}
                alt={title}
                className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <p className="text-sm text-gray-500 font-medium mb-1">
                {categoryLabels[category] ?? category}
            </p>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-green-600 font-semibold text-xl mb-4">{price}</p>
            <button
                onClick={() => onAddToCart?.(id)}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                {t("product.addToCart")}
            </button>
        </div>
    );
};

export default Product;
