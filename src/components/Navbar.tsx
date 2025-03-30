import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-gray-800">
          Nail Design
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="/home" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="/design" className="text-gray-600 hover:text-gray-900">
            Design
          </a>
          <a href="/cart" className="text-gray-600 hover:text-gray-900">
            Cart
          </a>
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
          <a href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </a>
          <a href="/services" className="text-gray-600 hover:text-gray-900">
            Services
          </a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
