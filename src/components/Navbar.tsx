import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingBag } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  return (
    <nav className="bg-white border-b shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Icons */}
        {/* <div className="flex items-center space-x-4 text-gray-700 text-lg">
          <button aria-label="Search" className="navbar-button">
            <FaSearch />
          </button>
        </div> */}

        {/* Center Logo */}
        <NavLink to="/" className="text-2xl font-bold flex items-center space-x-2 navbar-logo">
          <span className="font-[Pacifico] text-black">Nail Shop</span>
        </NavLink>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 text-gray-700 text-lg">
          <button aria-label="User" className="navbar-button">
            <FaUser/>
          </button>
          <button aria-label="Cart" className="navbar-button">
            <FaShoppingBag/>
          </button>

          {/* Language Switcher */}
          <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="p-1 border rounded text-sm"
          >
            <option value="en">EN</option>
            <option value="vi">VI</option>
            <option value="sv">SV</option>
            <option value="zh">ZH</option>
          </select>

        </div>
      </div>

      {/* Bottom Nav Links */}
      <div className="mt-4 flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-medium">
        <NavLink
            to="/"
            className={({isActive}) =>
                `navbar-link ${isActive ? "underline underline-offset-4 text-green-700" : ""}`
            }
        >
          {t("navbar.home")}
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `navbar-link ${isActive ? "underline underline-offset-4 text-green-700" : ""}`
          }
        >
          {t("navbar.shop")}
        </NavLink>
        <NavLink
          to="/custom-your-nail"
          className={({ isActive }) =>
            `navbar-link ${isActive ? "underline underline-offset-4 text-green-700" : ""}`
          }
        >
          {t("navbar.customize")}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;


// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold text-gray-800">
//           Nail Design
//         </Link>
//         <div className="hidden md:flex space-x-6">
//           <Link to="/" className="text-gray-600 hover:text-gray-900">
//             Home
//           </Link>
//           <Link to="/design" className="text-gray-600 hover:text-gray-900">
//             Design
//           </Link>
//           <Link to="/cart" className="text-gray-600 hover:text-gray-900">
//             Cart
//           </Link>
//         </div>
//         <button
//           className="md:hidden text-gray-600"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? "✖" : "☰"}
//         </button>
//       </div>
//       {isOpen && (
//         <div className="md:hidden flex flex-col items-center space-y-4 mt-2 bg-white shadow-md p-4">
//           <Link to="/" className="text-gray-600 hover:text-gray-900">
//             Home
//           </Link>
//           <Link to="/design" className="text-gray-600 hover:text-gray-900">
//             Design
//           </Link>
//           <Link to="/cart" className="text-gray-600 hover:text-gray-900">
//             Cart
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
