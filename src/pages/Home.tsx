import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import './Home.css'
import Footer from '../components/Footer'
import ServiceCard from "../components/ServiceCard";


const Home = () => {

    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <div className="home-container">
            <section className="hero">
                <h1>{t("home.welcome")}</h1>
            </section>

            <section>
                <div className="text-center mx-auto max-w-xl mb-2 gap-2">
                    <h1 className="text-3xl font-bold text-gray-800 py-4">{t("home.ourProduct")}</h1>
                    <p className="text-gray-600 mt-2 px-4">
                        {t("home.description")}
                    </p>
                </div>
            </section>

            <section className="services grid md:grid-cols-3 gap-6 p-6">
                <ServiceCard
                    icon="💅"
                    title={t("home.gel.title")}
                    description={t("home.gel.description")}
                    price="$29.99"
                    onReadMore={() => navigate('/shop?category=gelmanicure')}                />
                <ServiceCard
                    icon="🌿"
                    title={t("home.natural.title")}
                    description={t("home.natural.description")}
                    price="$24.99"
                    onReadMore={() => navigate('/shop?category=naturalcare')}                />
                <ServiceCard
                    icon="🎨"
                    title={t("home.art.title")}
                    description={t("home.art.description")}
                    price="$34.99"
                    onReadMore={() => navigate('/shop?category=nailart')}
                />
            </section>

            {/* <section className="about">
        <h2>Our Philosophy</h2>
        <p>
          We focus on providing a relaxing experience, using quality products and creative techniques. Your satisfaction and comfort are our top priorities.
        </p>
      </section> */}

            <Footer/>
        </div>
    );
};

export default Home;
