import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext.jsx";
import close from "../Assets/close.png";
import "../App.css";
const Hamburger = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div
      className={`hamburger fixed top-0 left-0 h-full bg-black text-white p-4 w-10/12 lg:w-1/4 transition-transform duration-300 transform ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      } hamburger-menu`}
    >
      <div className="w-full flex justify-between">
        <h1 className="julius w-full text-xl text-center p-4 underline md:text-2xl">
          ShieldGen
        </h1>
        <div className="flex-end ">
          <img
            src={close}
            alt="close"
            onClick={onClose}
            className="h-8 w-8 cursor-pointer m-2"
          />
        </div>
      </div>
      <div className="h-full flex flex-col justify-around sm:justify-none">
        <ul className="h-fit flex flex-col justify-between ">
          <div className="p-4 quicksand text-center">
            <Link
              to="/"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/training"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Training Programs
            </Link>
            <Link
              to="/dashboard/resource"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Resource Library
            </Link>
            <Link
              to="/dashboard/forum"
              className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
            >
              Forum
            </Link>
          </div>
        </ul>
        <div className="quicksand">
          <Link
            to="/dashboard/profile"
            className="block text-center m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
          >
            <button className="julius">Profile</button>
          </Link>
          <div
            className="block text-center m-4 bg-red-600 p-3 rounded hover:bg-red-700 cursor-pointer"
            onClick={handleLogout}
          >
            <button className="julius">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
