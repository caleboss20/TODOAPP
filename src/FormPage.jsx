import { useState } from "react";

import burger from "./assets/burger.png";
import google from "./assets/google.jpg";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaApple, FaFacebook } from "react-icons/fa";
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";

export default function FormPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [signInForm, setSignInForm] = useState({ username: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div
      className="min-h-screen 
    bg-white flex flex-col fixed"
    >
      {/* YOUR HERO IMAGE HERE */}
      <div className="w-full flex justify-center">
        <img
          src={burger}
          className="w-60
         h-60 object-fit"
        />
      </div>
      {/* TABS AT TOP */}
      <div
        className="flex border-b 
      border-gray-200 px-8 mt-4"
      >
        <button
          onClick={() => setTab("signin")}
          className={`flex-1 pb-3 text-base font-semibold transition-all duration-200 ${
            tab === "signin"
              ? "text-black border-b-2 outline-none border-yellow-400"
              : "text-gray-400"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setTab("signup")}
          className={`flex-1 pb-3 text-base font-semibold transition-all duration-200 ${
            tab === "signup"
              ? "text-black border-b-2 outline-none border-yellow-400"
              : "text-gray-400"
          }`}
        >
          Sign Up
        </button>
      </div>
      {/* SLIDER WRAPPER */}
      <div className="w-full overflow-hidden flex-1">
        <div
          className="flex w-[200%]
           transition-transform 
           duration-300 ease-in-out"
          style={{
            transform: tab === "signup" ? "translateX(-50%)" : "translateX(0%)",
          }}
        >
          {/* ---- SIGN IN FORM ---- */}
          <div
            className="w-1/2 px-8 
          pt-6 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Username / Mobile Number"
              value={signInForm.username}
              onChange={(e) =>
                setSignInForm({ ...signInForm, username: e.target.value })
              }
              className="w-full 
              px-4 py-4 rounded-xl
               border border-gray-200
                bg-white text-md
                focus:outline-none
                 focus:border-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={signInForm.password}
              onChange={(e) =>
                setSignInForm({ ...signInForm, password: e.target.value })
              }
              className="w-full px-4 py-4
               rounded-xl border 
               border-gray-200 bg-white
                text-md focus:outline-none focus:border-yellow-400"
            />
            <button
              className="text-right 
            text-sm text-yellow-500 
            font-small"
            >
              Forgot Password?
            </button>
            <button
              onClick={() => navigate("/deliverymainpage")}
              className="
            w-full py-3 bg-yellow-500
             rounded-4xl mt-3 text-lg font-medium text-white
            "
            >
              Sign In
            </button>
            <p
              className="text-center 
            text-md text-gray-600"
            >
              Don't have an account?{" "}
              <button
                onClick={() => setTab("signup")}
                className="border-none outline-none ml-1 text-yellow-500 font-medium"
              >
                Sign Up
              </button>
            </p>
            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {/* SOCIAL BUTTONS */}
            <div className="flex justify-center gap-5">
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center
               justify-center text-blue-600 font-bold text-lg"
              >
                <img src={google} className="w-8 h-8" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center
               justify-center font-bold text-lg"
              >
                <SiFacebook className="text-blue-800" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center
               justify-center text-lg"
              >
                <SiApple />
              </button>
            </div>
          </div>
          {/* ---- SIGN UP FORM ---- */}
          <div
            className="w-1/2 px-8 pt-6 flex 
          flex-col gap-4 pb-5"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={signUpForm.fullName}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, fullName: e.target.value })
              }
              className="w-full 
              px-4 py-4 rounded-xl
               border border-gray-200
                bg-white text-md
                focus:outline-none
                 focus:border-yellow-400"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={signUpForm.mobile}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, mobile: e.target.value })
              }
              className="w-full 
              px-4 py-4 rounded-xl
               border border-gray-200
                bg-white text-md
                focus:outline-none
                 focus:border-yellow-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpForm.password}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, password: e.target.value })
              }
              className="w-full 
              px-4 py-4 rounded-xl
               border border-gray-200
                bg-white text-md
                focus:outline-none
                 focus:border-yellow-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={signUpForm.confirmPassword}
              onChange={(e) =>
                setSignUpForm({
                  ...signUpForm,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full 
              px-4 py-4 rounded-xl
               border border-gray-200
                bg-white text-md
                focus:outline-none
                 focus:border-yellow-400"
            />
            <button
              className="
            w-full py-3 bg-yellow-500
             rounded-4xl mt-3
             border-none outline-none 
             text-lg font-medium text-white
            "
            >
              Sign Up
            </button>
            <p
              className="text-center 
            text-md text-gray-600"
            >
              Already a member?{" "}
              <button
                onClick={() => setTab("signin")}
                className="text-yellow-500 font-medium ml-1"
              >
                Sign In
              </button>
            </p>
            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {/* SOCIAL BUTTONS */}
            <div className="flex justify-center gap-5">
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center
               justify-center text-blue-600 font-bold text-lg"
              >
                <img src={google} className="w-8 h-8" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center
               justify-center font-bold text-lg"
              >
                <SiFacebook className="text-blue-800" />
              </button>
              <button
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center
               justify-center text-lg"
              >
                <SiApple />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
