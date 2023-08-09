import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function LoginPage() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const OnLogin = (event) => {
    event.preventDefault();
    console.log("Login button clicked");
    // Iam using Firebase login logic
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        history("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  const OnRegister = (event) => {
    event.preventDefault();
    // Iam using Firebase Register logic
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history("/");
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="flex bg-white items-center flex-col h-[100vh]">
      <Link to={"/"}>
        <img
          className="w-[150px] object-contain mt-20 mx-auto mb-0"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="flex flex-col w-[300px] h-fit rounded-sm border-gray-200 border mt-5 p-5 ">
        <h1 className=" text-3xl mb-5 font-bold ">Sign-in</h1>
        <form action="">
          <h5 className="text-lg mb-[5px] font-semibold">Email</h5>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="border h-[30px] border-black bg-white w-[98%] mb-2 rounded-sm p-1"
          />
          <h5 className="text-lg mb-[5px]  font-semibold">Password</h5>

          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="border border-black h-[30px] bg-white w-[98%] mb-2 rounded-sm p-1"
          />
          <button
            type="submit"
            className="bg-[#f0c14b] block border text-[#111] p-1 mt-[10px] font-semibold w-full h-[30px]"
            onClick={OnLogin}
          >
            Sign In
          </button>
        </form>
        <p className="mt-[15px] text-[12px]">
          By signing-in you agree to Amazon's Clone Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Internet-Based Ads Notice.
        </p>
        <button
          onClick={OnRegister}
          className="border  border-gray-500 text-[#111] p-1 mt-[10px] font-semibold w-full"
        >
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
