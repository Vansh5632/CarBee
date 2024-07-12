import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onSignInClick, onSignUpClick }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 bg-gray-800 text-gray-200 font-medium shadow-lg">
        <div className="text-2xl">Logo</div>
        <div className="flex items-center">
          {/* Menu Toggle Button */}
          <button
            className="lg:hidden bg-gray-700 text-gray-200 px-3 py-1.5 rounded-md transform transition-transform hover:-translate-y-1 hover:shadow-lg"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div className="">
          <ul className={`lg:flex ${showMenu ? "flex items-center" : "hidden"} absolute top-full left-20 bg-gray-800 text-gray-200 mt-1 shadow-lg py-3 px-3 lg:relative lg:bg-transparent lg:shadow-none lg:py-0 lg:flex lg:gap-5 flex justify-between border border-gray-600 bg-opacity-30 p-2 rounded-2xl`}>
            <li className="hover:bg-gray-700 rounded-2xl p-2 transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:bg-gray-700 rounded-2xl p-2 transition-colors">
            <Link to="/news">News</Link>
            </li>
            <li className="hover:bg-gray-700 rounded-2xl p-2 transition-colors">
            <Link to="/discuss">Discuss</Link>
            </li>
            <li className="hover:bg-gray-700 rounded-2xl p-2 transition-colors">
            <Link to="/carobot">Carobot</Link>
            </li>
          </ul>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <button 
            className="bg-purple-600 text-white px-3 py-1.5 rounded-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-purple-700"
            onClick={onSignInClick}
          >
            Sign In
          </button>
          <button 
            className="bg-purple-400 text-white px-3 py-1.5 rounded-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-purple-500"
            onClick={onSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </nav>
    );
};

export default Navbar;
