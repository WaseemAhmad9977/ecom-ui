import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Context from "../util/Context";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import http from "../util/http";
import { mutate } from "swr";

import {
  
  RiHomeLine,
  RiUserLine,
  RiMailLine,
  RiApps2Line,
  RiLogoutCircleRLine,
  RiMenuLine,
  RiArrowRightSLine,
  RiShoppingBag3Line
} from "react-icons/ri";


const Layout = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const acountMenu = [
    {
      label: "Dashboard",
      link: "/app/ebook",
      icon: <RiApps2Line className="mr-2 text-lg" />,
    },
    {
      label: "Logout",
      link: "/app/logout",
      icon: <RiLogoutCircleRLine className="mr-2 text-lg" />,
    },
  ];

  const OnAccountMenuClick = async (link) => {
    try {
      if (link === "/app/logout") {
        await http.get("/user/logout");
        setSession(null), setSessionLoading(null);
        return navigate("/");
      }

      navigate(link);
    } catch (err) {
      toast.error(err.response ? err.response.message : err.message);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                <RiShoppingBag3Line className="text-white text-lg sm:text-xl" />
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
                ShopEase
              </span>
            </Link>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link
                to="/"
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                <RiHomeLine className="text-xl mr-2" />
                Home
              </Link>

              {/* {!sessionLoading && session && ( */}
              <button
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium capitalize relative transition-colors duration-200 animate__animated animate__fadeIn"
                onClick={() => setOpen(!open)}
              >
                <RiUserLine className="text-xl mr-2" />
                Account
                {open && (
                  <div className="py-2 flex flex-col min-w-[200px] bg-white shadow-xl rounded-xl absolute top-12 right-0 border border-gray-100 overflow-hidden">
                    <label className="text-gray-500 text-sm px-4 py-2 bg-gray-50">
                      <RiMailLine className="mr-2" />
                      {/* {session.email} */}
                      user@example.com
                    </label>
                    <hr className="my-1" />
                    {acountMenu.map((item, index) => (
                      <button
                        onClick={() => OnAccountMenuClick(item.link)}
                        key={index}
                        className="text-gray-700 text-left px-4 py-2.5 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center"
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </button>
              {/* )} */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <RiMenuLine className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="flex-grow">
        <Outlet />
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-sm">
            {/* About */}
            <div>
              <div className="flex items-center gap-2">
                <i className="ri-shopping-bag-3-line text-2xl"></i>
                <h1 className="text-xl font-bold">ShopEase</h1>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Your premium destination for quality products. Discover,
                explore, and shop with confidence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <RiArrowRightSLine className="mr-1" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <RiArrowRightSLine className="mr-1" />
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <RiArrowRightSLine className="mr-1" />
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <RiArrowRightSLine className="mr-1" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund"
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <RiArrowRightSLine className="mr-1" />
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-300 hover:text-white hover:underline transition-colors duration-200 flex items-center"
                  >
                    <RiArrowRightSLine className="mr-1" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm py-4 sm:py-5 bg-black bg-opacity-30 border-t border-gray-700">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} BookStore Pro. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
