import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="#">How to Apply</a></li>
            <li><a href="#">Customize Your Nails</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>MORE INFO</h4>
          <ul>
            <li><a href="#">Search</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>CONTACT US</h4>
          <p>info@cutiepopnailshop.com</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025, Cutie Pop Nail Shop Powered by React · 
          <a href="#"> Refund policy</a> · 
          <a href="#"> Privacy policy</a> · 
          <a href="#"> Terms of service</a> · 
          <a href="#"> Shipping policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
