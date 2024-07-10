import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 bg-gray-800 text-gray-200 font-medium shadow-lg">
      <div className="text-2xl">Logo</div>
      <div className="flex justify-between border border-gray-600 bg-gray-700 bg-opacity-30 p-2 rounded-2xl">
        <ul className="flex gap-5">
          <li className="hover:bg-gray-600 rounded-xl p-1 transition-colors">
            <a href="/home">Home</a>
          </li>
          <li className="hover:bg-gray-600 rounded-xl p-1 transition-colors">
            <a href="/blogs">Blogs</a>
          </li>
          <li className="hover:bg-gray-600 rounded-xl p-1 transition-colors">
            <a href="#">News</a>
          </li>
          <li className="hover:bg-gray-600 rounded-xl p-1 transition-colors">
            <a href="#">Chatbot</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-2">
        <button className="bg-purple-600 text-white px-3 py-1.5 rounded-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-purple-700">
          Sign In
        </button>
        <button className="bg-purple-400 text-white px-3 py-1.5 rounded-md transform transition-transform hover:-translate-y-1 hover:shadow-lg hover:bg-purple-500">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
