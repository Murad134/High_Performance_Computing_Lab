import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center p-4 pt-24">
      {/* Outer container */}
      <div className="w-full max-w-md">
        {/* App title */}
        <h1 className="text-center text-4xl font-extrabold drop-shadow-lg mb-8 tracking-wide">
          Welcome Back
        </h1>

        {/* Glass card */}
        <div className="backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 transition-transform hover:scale-[1.02]">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login to Your Account
          </h2>

          <form className="space-y-5">
            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                required
              />
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a className="text-sm text-red-500 underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Login button */}
            <button className="btn w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold border-none shadow-lg hover:from-sky-500 hover:to-blue-600 transition-all">
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center my-4">
              <span className="text-sm text-pink-600 font-medium">OR</span>
            </div>

            {/* Social login */}
            <button className="btn w-full text-gray-800 font-semibold shadow bg-gray-200">
              <FaGoogle /> Login with Google
            </button>

            {/* Register link */}
            <p className="text-center mt-3">
              New here?{" "}
              <Link
                to="/auth/register"
                className="text-green-600 font-semibold hover:underline text-[18px]"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
