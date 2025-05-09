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
    return location.pathname === path ? 'text-teal-600 font-medium' : 'text-gray-700 hover:text-teal-600';
  };
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-1' : 'bg-white bg-opacity-98 py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center mr-2 shadow-sm">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">DetoxIT</h1>
            </Link>
          </div>          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Dropdown for Devices */}
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 py-2">
                Devices
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>              <div className="absolute left-0 mt-0 w-52 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                <Link to="/catalog" className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/catalog')}`}>
                  Browse Devices
                </Link>
                <Link to="/matching" className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/matching')}`}>
                  Smart Matching
                </Link>
                <Link to="/diagnostics" className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/diagnostics')}`}>
                  Device Diagnostics
                </Link>
              </div>
            </div>
            
            {/* Dropdown for Resources */}
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 py-2">
                Resources
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>              <div className="absolute left-0 mt-0 w-52 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                <Link to="/resources" className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/resources')}`}>
                  Education Hub
                </Link>
                <Link to="/impact" className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/impact')}`}>
                  Impact Calculator
                </Link>
                <Link to="/marketplace" className={`block px-4 py-2 text-sm hover:bg-gray-50 ${isActive('/marketplace')}`}>
                  Parts Marketplace
                </Link>
              </div>
            </div>
            
            <Link to="/about" className={`${isActive('/about')} transition-colors duration-200 py-2 font-medium`}>
              About Us
            </Link>
            <Link to="/faq" className={`${isActive('/faq')} transition-colors duration-200 py-2 font-medium`}>
              FAQ
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors duration-200 py-2 font-medium`}>
              Contact
            </Link>
              {isLoggedIn ? (              <div className="flex items-center space-x-4 ml-4">
                <Link to="/dashboard">
                  <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50 py-1 px-3 text-sm shadow-sm">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/signup">
                  <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50 py-1 px-3 text-sm shadow-sm">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="primary" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 py-1 px-3 text-sm shadow-sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-teal-600 transition-colors duration-200"
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
      </div>      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-3 pt-2 pb-3 space-y-1">
            {/* Devices Section */}            <div className="px-3 py-1.5 font-medium text-gray-700 border-b border-gray-200 mb-1">Devices</div>
            <Link
              to="/catalog"
              className={`block px-3 py-1.5 rounded-md ${isActive('/catalog')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Devices
            </Link>
            <Link
              to="/matching"
              className={`block px-3 py-1.5 rounded-md ${isActive('/matching')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Smart Matching
            </Link>
            <Link
              to="/diagnostics"
              className={`block px-3 py-1.5 rounded-md ${isActive('/diagnostics')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Device Diagnostics
            </Link>
              {/* Resources Section */}            <div className="px-3 py-1.5 font-medium text-gray-700 border-b border-gray-200 mt-3 mb-1">Resources</div>
            <Link
              to="/resources"
              className={`block px-3 py-1.5 rounded-md ${isActive('/resources')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Education Hub
            </Link>
            <Link
              to="/impact"
              className={`block px-3 py-1.5 rounded-md ${isActive('/impact')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Impact Calculator
            </Link>
            <Link
              to="/marketplace"
              className={`block px-3 py-1.5 rounded-md ${isActive('/marketplace')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Parts Marketplace
            </Link>
            
            {/* About & Contact */}            <div className="px-3 py-1.5 font-medium text-gray-700 border-b border-gray-200 mt-3 mb-1">More</div>            <Link
              to="/about"
              className={`block px-3 py-1.5 rounded-md ${isActive('/about')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className={`block px-3 py-1.5 rounded-md ${isActive('/faq')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-1.5 rounded-md ${isActive('/contact')} hover:bg-gray-50`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
              {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="block px-3 py-2 mt-4 text-center text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 rounded-md font-medium shadow-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 mt-4 text-center text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 rounded-md font-medium shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 mt-2 text-center border border-teal-500 text-teal-600 hover:bg-teal-50 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>      )}
      
      {/* Add spacing below navbar since it's fixed - increased to account for taller navbar */}
      <div className="h-16"></div>
    </nav>
  );
};

export default Navbar;