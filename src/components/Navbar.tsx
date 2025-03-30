import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Nail Design
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/design" className="text-gray-600 hover:text-gray-900">
            Design
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900">
            Cart
          </Link>
        </div>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-2 bg-white shadow-md p-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/design" className="text-gray-600 hover:text-gray-900">
            Design
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900">
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
