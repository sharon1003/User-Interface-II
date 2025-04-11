import './Home.css'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Blossom Nails</h1>
        <p>
          At Blossom Nails, we believe your hands tell your story. Pamper yourself with our elegant and trendy nail services designed for every occasion.
        </p>
      </section>

      <section className="services">
        <div className="service-card">
          <h2>💅 Gel Manicure</h2>
          <p>Long-lasting, glossy finish with a range of seasonal and classic colors.</p>
        </div>
        <div className="service-card">
          <h2>🌿 Natural Care</h2>
          <p>Nourish your nails and cuticles with our organic treatments.</p>
        </div>
        <div className="service-card">
          <h2>🎨 Nail Art</h2>
          <p>From minimalist to bold, express your personality with custom nail art.</p>
        </div>
      </section>

      <section className="about">
        <h2>Our Philosophy</h2>
        <p>
          We focus on providing a relaxing experience, using quality products and creative techniques. Your satisfaction and comfort are our top priorities.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
