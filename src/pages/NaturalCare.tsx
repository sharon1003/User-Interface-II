import ProductDetail from "../components/ProductDetail";

const NatureCare = () => {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold text-center mb-8">Nail Art Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductDetail
        title="Green Tea Shield"
        image="/images/gel/pastel-garden.jpg"
        description="Antioxidant-rich gel with a fresh, calming scent"
        price="$22.5"
        />
        <ProductDetail
        title="Coconut Oil Infusion"
        image="/images/natural/coconut-oil.jpg"
        description="Enriched with coconut essence for deep hydration and nail strengthening."
        price="$19.99"
        />
        {/* <ProductDetail
            key={product.id}
            title={product.title}
            image={product.image}
            description={product.description}
            price={product.price}
            /> */}
        </div>
    </div>
    );
};

export default NatureCare;

