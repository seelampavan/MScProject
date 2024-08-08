import React from "react";

import open from "../Assets/open.png";
import { Link } from "react-router-dom";
import { useUser } from "../userContext.js";


const Header2 = ({ showHamburger, setShowHamburger }) => {
  const { user } = useUser();
  return (
    <div>
      <div className="bg-black min-h-16 text-white flex flex-row items-center justify-between w-screen p-2 overflow-hidden">
        <div className="flex flex-row items-center">
          <div className="ml-2 h-10 w-10 md:h-16 md:w-16 rounded-full flex items-center">
            <button onClick={() => setShowHamburger(!showHamburger)}>
              <img
                src={open}
                alt="hamburger menu"
                className="h-8 w-8 text-white"
              />
            </button>
          </div>
          <h1 className="julius text-xl">ShieldGen</h1>
        </div>
        <ul className="quicksand flex flex-row items-center justify-around p-4 gap-10 cursor-pointer hidden lg:flex">
          {user.username ? (
            <>
              <Link to="/" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/contact">
                <li className="hover:underline">Training Programs</li>
              </Link>
              <Link to="/about" className="hover:underline">
                Resource Library
              </Link>
              <Link to="/dashboard">
                <li className="hover:underline">Forum</li>
              </Link>
            </>
          ) : (
            <Link to="/login">
              <li className="hover:underline">Login</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header2;
