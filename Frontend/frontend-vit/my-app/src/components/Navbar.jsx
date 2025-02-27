import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react"; // Import icons (install lucide-react if needed)

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Change this based on authentication
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark mode class on mount based on localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./images/syringe.png" className="h-8" alt="Vitalize Logo" />
          <span className="text-black dark:text-white self-center text-2xl font-semibold whitespace-nowrap">
            Vitalize
          </span>
        </Link>

        {/* Right Buttons */}
        <div className="flex md:order-2 gap-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Dark Mode Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Auth Buttons */}
          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Link
              to="/logout"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Logout
            </Link>
          )}
        </div>

        {/* Navbar Links */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-6 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="flex-1 text-center">
              <Link to="/home" className="block py-2 px-3 md:p-0 text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:text-blue-500">
                Home
              </Link>
            </li>
            <li className="flex-1 text-center">
              <Link to="/about" className="block py-2 px-3 md:p-0 text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:text-blue-500">
                About
              </Link>
            </li>
            <li className="flex-1 text-center">
              <Link to="/services" className="block py-2 px-3 md:p-0 text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:text-blue-500">
                Services
              </Link>
            </li>
            <li className="flex-1 text-center">
              <Link to="/contact" className="block py-2 px-3 md:p-0 text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:hover:text-blue-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
