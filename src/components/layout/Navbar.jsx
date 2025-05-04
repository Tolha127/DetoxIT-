// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine active link
  const isActive = (path) => {
    return location.pathname === path ? 'text-green-600 font-medium' : 'text-gray-700 hover:text-green-600';
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-1' : 'bg-white bg-opacity-95 py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">DetoxIT</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/catalog" className={`${isActive('/catalog')} transition-colors duration-200`}>
              Browse Devices
            </Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors duration-200`}>
              About Us
            </Link>
            <Link to="/faq" className={`${isActive('/faq')} transition-colors duration-200`}>
              FAQ
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors duration-200`}>
              Contact
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 py-1 text-sm">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/signup">
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 py-1 text-sm">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="primary" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-1 text-sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/catalog"
              className={`block px-3 py-2 rounded-md ${isActive('/catalog')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Devices
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md ${isActive('/about')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className={`block px-3 py-2 rounded-md ${isActive('/faq')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md ${isActive('/contact')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="block px-3 py-2 mt-2 text-center text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 mt-2 text-center text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 mt-2 text-center border border-green-500 text-green-600 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Add spacing below navbar since it's fixed */}
      <div className="h-12"></div>
    </nav>
  );
};

export default Navbar;