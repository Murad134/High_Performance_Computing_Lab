import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "./Authentication/SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from '../Firebase/firebase.init'
export default function Login() {

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    try {

      // 1️⃣ Validate terms acceptance
      if (!data.terms) {
        Swal.fire({
          title: "Terms not accepted",
          text: "Please accept Terms and Conditions",
          icon: "warning"
        });
        return;
      }

      // 2️⃣ Check if user exists in backend
      const res = await axiosInstance.get(
        `/users/check?email=${data.email}`
      );

      if (!res.data.exists) {
        Swal.fire({
          title: "Not Registered",
          text: "Please register first then try.",
          icon: "warning"
        });
        return;
      }

      // 3️⃣ Attempt Firebase sign-in
      setErrorMessage(""); // clear previous error message
      const result = await signIn(data.email, data.password);
      const user = result.user;

      // 4️⃣ Check email verification
      if (!result.user.emailVerified) {
        Swal.fire({
          title: "Email Not Verified",
          text: "Please verify your email before logging in.",
          icon: "warning"
        });
        return;
      }


      // 5️⃣ Update last login time in backend
      const userInfo = {
        email: user.email,
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.patch("/users", userInfo);

      reset();
      
      // 6️⃣ Show success message and navigate
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handleForgotPassword = () => {
    const email = getValues('email'); // get email from form
    if (!email) {
      Swal.fire({
        title: "Email Required",
        text: "Please enter your email to reset password.",
        icon: "warning"
      });
      return;
    }

    setErrorMessage(""); // reset previous errors

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Password Reset Email Sent",
          text: "Check your inbox to reset your password.",
          icon: "success"
        });
      })
      .catch(error => {
        setErrorMessage(error.message); // now this works!
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        });
      });
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
            <div className="relative">
              <label htmlFor="password" className="block font-medium mb-1">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md w-full text-black placeholder-gray-400 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 pl-3 pr-10 py-2"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2/3 right-3 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>
              )}
            </div>

            {/* Forgot password */}
            <div onClick={handleForgotPassword} className="text-right">
              <a className="text-sm text-red-500 underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            <label className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                {...register('terms', { required: "You must accept the terms and conditions" })}
                className="checkbox border border-gray-700 rounded-lg text-blue-600 p-1"
              />
              <span>Accept Terms and Conditions</span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

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