import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebase.js";
const Header = () => {
  const handleAuthentication = () => {
    if (user) {
      console.log("Sign out now");
      auth.signOut();
    }
  };
  const [{ basket, user }, dispatch] = useStateValue();
  const userName = user?.email.split("@");
  return (
    <div className="header h-[60px] flex items-center justify-between bg-[#131921] sticky top-0 z-50">
      <Link to={"/"}>
        <img
          className="w-[100px] object-contain mt-[18px] mx-[20px] mb-0"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="flex flex-1 items-center ">
        <input
          className="border-none outline-none p-1 h-[24px] grow"
          type="text"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-white p-[5px] w-[22px] h-[24px] bg-[#cd9042]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <div className="flex mx-[10px] text-white justify-evenly items-center">
        <Link to={!user && "/login"}>
          <div
            onClick={handleAuthentication}
            className="header__nav-items text-[10px]"
          >
            Hello {user ? userName[0] : "Guest"}
            <span className="text-[13px] font-extrabold">
              {user ? "Sign out " : "Sign in"}
            </span>
          </div>
        </Link>
        <div className="header__nav-items text-[10px]">
          Returns <br />
          <span className="text-[13px] font-extrabold">& Orders</span>
        </div>
        <Link to={"/checkout"}>
          <div className="mx-[10px] flex flex-row text-[13px] font-extrabold items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            <span className="mx-[3px]">{basket.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
