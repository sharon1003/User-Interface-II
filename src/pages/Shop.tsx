// src/pages/ShopPage.tsx
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../components/CartContext.tsx";
import Product from "../components/Product.tsx";
import { allProducts } from "../data/product";

const ShopPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") ?? "all";

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  const categoryKeys = ["all", "gelmanicure", "nailart", "naturalcare"];
  //const [cartItems, setCartItems] = useState([]);

  const { addToCart } = useCart();

  return (
    <div className="bg-[#f5f3ea] min-h-screen">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          🛍 {t("shop.ourProducts")}
        </h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categoryKeys.map((key) => (
            <a
              key={key}
              href={key === "all" ? "/shop" : `/shop?category=${key}`}
              className={`px-4 py-2 rounded border ${
                selectedCategory === key ||
                (key === "all" && selectedCategory === "all")
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {t(`shop.categories.${key}`)}
            </a>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <Product
              key={p.id}
              id={p.id}
              category={p.category}
              image={p.image}
              price={p.price}
              title={p.translations[lang]?.title ?? p.translations.en.title}
              description={
                p.translations[lang]?.description ??
                p.translations.en.description
              }
              onAddToCart={() =>
                addToCart({
                  id: p.id,
                  category: p.category,
                  image: p.image,
                  price: p.price,
                  title: p.translations[lang]?.title ?? p.translations.en.title,
                  description:
                    p.translations[lang]?.description ??
                    p.translations.en.description,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
