import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { sendEmailVerification } from "firebase/auth";
import useAxios from '../hooks/useAxios'
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const { register: formRegister, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth(); // Firebase auth
    const navigate = useNavigate();
    const [photoURL, setPhotoURL] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    // Image upload handler
    const handleImageUpload = async (e) => {
        const image = e.target.files[0];

        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                formData
            );
            setPhotoURL(res.data.data.display_url);
        } catch (err) {
            console.error("Image upload error:", err.message);
        }
    };


    const onSubmit = async (data) => {
        try {
            if (!photoURL) {
                Swal.fire({
                    title: "Photo Required",
                    text: "Please upload a photo.",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                });
                return;
            }

            // Check if user already exists in backend
            const res = await axiosInstance.get(`/users/check?email=${data.email}`);
            if (res.data.exists) {
                Swal.fire({
                    title: "Already Registered",
                    text: "This email is already registered. Please login.",
                    icon: "warning"
                });
                return;
            }



            // 2 Create Firebase user
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            console.log('Firebase user:', loggedUser);


            // 3 Send email verification (always send)
            await sendEmailVerification(loggedUser);


            // 4 Send user info to backend
            const userInfo = {
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
                displayName: data.name,
                photoURL: photoURL || ""
            };

            const userRes = await axiosSecure.post("/users", userInfo);
            console.log("Backend response:", userRes.data);

            // 5 Update Firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL: photoURL || ""
            });

            // ✅ Success SweetAlert
            await Swal.fire({
                title: "Registration Successful!",
                text: `Welcome ${data.name}!`,
                icon: "success",
                confirmButtonText: "Continue",
                confirmButtonColor: "#3085d6"
            });

            reset();
            navigate('/auth/login');

        } catch (err) {
            setErrorMessage(err.message);

            // ✅ Error SweetAlert
            Swal.fire({
                title: "Registration Failed",
                text: err.message,
                icon: "error",
                confirmButtonColor: "#d33"
            });
        }
    };

    return (
        <div className="min-h-screen px-4 py-28">
            <div className="mx-auto max-w-md">
                <div className="backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 transition-transform hover:scale-[1.02]">
                    <h2 className="text-4xl font-bold text-center mb-6">
                        Register For New Account
                    </h2>

                    {errorMessage && (
                        <p className="text-red-600 mb-3 text-center">{errorMessage}</p>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                                {...formRegister("name", { required: "Name is required" })}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block font-medium mb-1">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                                {...formRegister("email", { required: "Email is required" })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block font-medium mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3 pr-12"
                                    {...formRegister("password", { required: "Password is required" })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-sky-700 hover:text-sky-900"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        {/* Register button */}
                        <button className="btn w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold border-none shadow-lg hover:from-sky-500 hover:to-blue-600 transition-all">
                            Register
                        </button>

                        {/* Login link */}
                        <p className="text-center mt-3">
                            Already registered? Please{" "}
                            <Link to="/auth/login" className="text-green-600 font-semibold hover:underline text-[18px]">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}