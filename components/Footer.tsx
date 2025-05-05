import { useTranslation } from "react-i18next";
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="custom-footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>{t("footer.quickLinks")}</h4>
          <ul>
            <li><a href="#">{t("footer.howToApply")}</a></li>
            <li><a href="#">{t("footer.customize")}</a></li>
            <li><a href="#">{t("footer.faqs")}</a></li>
            <li><a href="#">{t("footer.aboutUs")}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t("footer.moreInfo")}</h4>
          <ul>
            {/* <li><a href="#">Search</a></li> */}
            <li><a href="#">{t("footer.terms")}</a></li>
            {/* <li><a href="#">Refund Policy</a></li> */}
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t("footer.contactUs")}</h4>
          <p>info@nailshop.com</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            {/* <a href="#"><i className="fab fa-tiktok"></i></a> */}
            {/* <a href="#"><i className="fab fa-pinterest"></i></a> */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025, Nail Shop
          {/* <a href="#"> Refund policy</a> ·  */}
          {/* <a href="#"> Privacy policy</a> ·  */}
          <a href="#">{t("footer.terms")}</a>
          {/* <a href="#"> Shipping policy</a> */}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
