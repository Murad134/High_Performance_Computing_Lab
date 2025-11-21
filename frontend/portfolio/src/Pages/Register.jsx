import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthContext";
export default function Register() {
    const { createUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password, ...userProfile } = Object.fromEntries(formData.entries());
        console.log(email, password, userProfile);

        //
        createUser(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
            })
            .catch((error) => {
                console.log("error", error.message);
            });
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 px-4 py-28">
            {/* Outer container */}
            <div className="max-w-md mx-auto">
                {/* App title */}
                <h1 className="text-center text-4xl font-extrabold drop-shadow-lg mb-8 tracking-wide">
                    Welcome, New User
                </h1>

                {/* Glass card */}
                <div className="backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 transition-transform hover:scale-[1.02]">
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Register For New Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                                required
                            />
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block font-medium mb-1">Photo URL</label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Enter your photo URL"
                                className="border border-blue-400 input input-bordered w-full text-black placeholder-gray-600 focus:ring-2 focus:ring-sky-400 pl-3"
                                required
                            />
                        </div>

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

                        {/* Register button */}
                        <button className="btn w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold border-none shadow-lg hover:from-sky-500 hover:to-blue-600 transition-all">
                            Register
                        </button>

                        {/* Login link */}
                        <p className="text-center mt-3">
                            Already registered? Please{" "}
                            <Link
                                to="/auth/login"
                                className="text-green-600 font-semibold hover:underline text-[18px]"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
