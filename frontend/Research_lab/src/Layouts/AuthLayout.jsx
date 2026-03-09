import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-base-200 py-6 px-2 md:p-10 flex flex-col">

      {/* Navbar */}
      <header className="w-11/12 mx-auto mb-6">
        <Navbar />
      </header>

      {/* Hero Content */}
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-2 w-11/12 mx-auto">

        {/* Right Side → Image */}
        <div className="flex-1 flex justify-center py-2">
          <img
            src="/assetss/HPC_Login.jpg"
            alt="Auth Illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Left Side → Form */}
        <div className="flex-1 w-full max-w-md">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
export default AuthLayout;