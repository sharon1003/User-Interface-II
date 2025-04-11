import ProductDetail from "../components/ProductDetail";
import { useState } from "react";
import { allProducts } from "../data/product"; // 路徑依你的位置調整


const ShopPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
  
    const filteredProducts = allProducts.filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    );
  
    return (
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">🛍 Our Products</h1>
  
        {/* Filter 按鈕區 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["All", "Gel Manicure", "Nail Art", "Natural Care"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded border ${
                selectedCategory === cat
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
  
        {/* 商品卡片區 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p, idx) => (
            <ProductDetail
              key={idx}
              title={p.title}
              image={p.image}
              description={p.description}
              price={p.price}
            />
          ))}
        </div>
      </div>
    );
  };
  

export default ShopPage;