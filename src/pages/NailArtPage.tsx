import ProductDetail from "../components/ProductDetail";

const NailArtPage = () => {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold text-center mb-8">Nail Art Collection</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ProductDetail
        title="Nail Art"
        image="/images/nail-art-01.jpg"
        description="This set includes artistic designs to help you express your personality with bold or minimalist styles. Easy to apply, long-lasting finish."
        price="$34.99"
        />
        <ProductDetail
        title="Nail Art"
        image="/images/nail-art-01.jpg"
        description="This set includes artistic designs to help you express your personality with bold or minimalist styles. Easy to apply, long-lasting finish."
        price="$34.99"
        />
        <ProductDetail
        title="Nail Art"
        image="/images/nail-art-01.jpg"
        description="This set includes artistic designs to help you express your personality with bold or minimalist styles. Easy to apply, long-lasting finish."
        price="$34.99"
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

export default NailArtPage;
