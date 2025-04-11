import { useNavigate } from "react-router-dom";
import './Home.css'
import Footer from '../components/Footer'
import ServiceCard from "../components/ServiceCard";


const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Nail Shop</h1>
      </section>

      <section>
      <div className="text-center mx-auto max-w-xl mb-2 gap-2">
        <h1 className="text-3xl font-bold text-gray-800 py-4">Our Product</h1>
        <p className="text-gray-600 mt-2 px-4">
          Discover your favorite styles with our most popular nail services.
        </p>
      </div>
      </section>

      <section className="services grid md:grid-cols-3 gap-6 p-6">
        <ServiceCard
          icon="💅"
          title="Gel Manicure"
          description="Long-lasting, glossy finish with a range of seasonal and classic colors."
          price="$29.99"
          onReadMore={() => navigate('/shop/gel-manicure')}
        />
        <ServiceCard
          icon="🌿"
          title="Natural Care"
          description="Nourish your nails and cuticles with our organic treatments."
          price="$24.99"
          onReadMore={() => navigate('/shop/natural-care')}
        />
        <ServiceCard
          icon="🎨"
          title="Nail Art"
          description="From minimalist to bold, express your personality with custom nail art."
          price="$34.99"
          onReadMore={() => navigate('/shop/nail-art')}
        />   
    </section>

      {/* <section className="about">
        <h2>Our Philosophy</h2>
        <p>
          We focus on providing a relaxing experience, using quality products and creative techniques. Your satisfaction and comfort are our top priorities.
        </p>
      </section> */}

      <Footer />
    </div>
  );
};

export default Home;
