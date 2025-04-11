type ProductDetailProps = {
    title: string;
    image: string;
    description: string;
    price: string;
  };
  
  const ProductDetail = ({ title, image, description, price }: ProductDetailProps) => {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <img src={image} alt={title} className="w-64 mx-auto rounded mb-4" />
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-green-600 font-semibold text-xl">{price}</p>
        <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default ProductDetail;
  