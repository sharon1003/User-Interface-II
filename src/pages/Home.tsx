import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Joyride, { STATUS, Step } from "react-joyride";
import "./Home.css";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps: Step[] = [
    {
      target: ".step-shop",
      content: t("tour.shop"),
    },
    {
      target: ".step-customize",
      content: t("tour.customize"),
    },
    {
      target: ".step-cart",
      content: t("tour.cart"),
    },
    {
      target: ".step-start",
      content: t("tour.start"),
    },
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status, index, type, action } = data;
  
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
    } else if (type === "step:after") {
      if (action === "next") {
        setStepIndex(index + 1);
      } else if (action === "prev") {
        setStepIndex(index - 1);
      }
    }
  };

  return (
    <div className="home-container">
      <Joyride
        steps={steps}
        run={runTour}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous
        showSkipButton
        spotlightClicks
        locale={{
          back: t("tour.back"),
          close: t("tour.close"),
          last: t("tour.last"),
          next: t("tour.next"),
          skip: t("tour.skip"),
        }}
        styles={{ options: { zIndex: 9999 } }}
      />

      <section className="hero step-start">
        <h1>{t("home.welcome")}</h1>
      </section>

      <section>
        <div className="text-center mx-auto max-w-xl mb-2 gap-2">
          <h1 className="text-3xl font-bold text-gray-800 py-4">
            {t("home.ourProduct")}
          </h1>
          <p className="text-gray-600 mt-2 px-4">{t("home.description")}</p>
        </div>
      </section>

      <section className="services grid md:grid-cols-3 gap-6 p-6 step-shop">
        <ServiceCard
          icon="💅"
          title={t("home.gel.title")}
          description={t("home.gel.description")}
          price="$29.99"
          onReadMore={() => navigate("/shop?category=gelmanicure")}
        />
        <ServiceCard
          icon="🌿"
          title={t("home.natural.title")}
          description={t("home.natural.description")}
          price="$24.99"
          onReadMore={() => navigate("/shop?category=naturalcare")}
        />
        <ServiceCard
          icon="🎨"
          title={t("home.art.title")}
          description={t("home.art.description")}
          price="$34.99"
          onReadMore={() => navigate("/shop?category=nailart")}
        />
      </section>

      <div className="text-center mt-8">
        <button
          onClick={() => {
            setStepIndex(0);
            setRunTour(true);
          }}
          className="fixed bottom-6 right-6 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
        >
          {t("home.helpMeTour")}
        </button>
      </div>

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
