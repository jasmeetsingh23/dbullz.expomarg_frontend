import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaAddressBook,
  FaCube,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPenFancy,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/ex.png";

const Header = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/");
  };

  const menuItems = [
    { href: "/view", icon: FaCube, text: "3D Design" },
    { href: "/event", icon: FaCalendarAlt, text: "Event" },
    { href: "/inquiries2", icon: FaEnvelope, text: "Inquiries" },
    // { href: "/welcome", icon: FaCalculator, text: "Calculator" },
    { href: "/directory", icon: FaAddressBook, text: "Directory" },
    // { href: "/document", icon: FaFolder, text: "Document" },
    { href: "/proposal", icon: FaPenFancy, text: "Proposal" },
  ];

  const NavLink = ({ href, icon: Icon, text }) => (
    <a
      href={href}
      className="flex items-center font-body hover:bg-gray-100 text-[#91c848] px-3 py-1.5 rounded-lg w-full transition-colors duration-200"
      onClick={() => setIsMenuOpen(false)}
    >
      <Icon className="text-lg min-w-5" />
      <span className="ml-2 text-sm whitespace-nowrap">{text}</span>
    </a>
  );

  return (
    <header className="relative text-white shadow-lg bg-gradient-to-r from-[#91c848] to-[#4caf50]">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="text-xl text-white" />
            ) : (
              <FaBars className="text-xl text-white" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center font-body bg-white hover:bg-gray-100 text-[#91c848] px-3 py-1.5 rounded-full transition-colors duration-200 text-sm whitespace-nowrap"
              >
                <item.icon className="text-base" />
                <span className="ml-2">{item.text}</span>
              </a>
            ))}
            {authToken && (
              <button
                onClick={handleLogout}
                className="flex items-center bg-white hover:bg-gray-100 font-body text-red-500 px-3 py-1.5 rounded-full transition-colors duration-200 text-sm whitespace-nowrap"
              >
                <FaSignOutAlt className="text-base" />
                <span className="ml-2">Logout</span>
              </button>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden fixed top-14 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <nav className="flex flex-col p-3 space-y-1.5">
              {menuItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
              {authToken && (
                <button
                  onClick={handleLogout}
                  className="flex items-center font-body text-red-500 px-3 py-1.5 rounded-lg w-full hover:bg-gray-100 transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  <FaSignOutAlt className="text-lg min-w-5" />
                  <span className="ml-2">Logout</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
