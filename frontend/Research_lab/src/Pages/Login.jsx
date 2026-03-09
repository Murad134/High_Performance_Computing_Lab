import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "./Authentication/SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

export default function Login() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;

      const userInfo = {
        email: user.email,
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.patch("/users", userInfo);

      reset();
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 transition-transform hover:scale-[1.02]">
          <h2 className="text-4xl font-semibold text-center mb-6">
            Login to Your Account
          </h2>

          {errorMessage && (
            <p className="text-red-600 mb-3 text-center">{errorMessage}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
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

            {/* Social login */}
            <SocialLogin />

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