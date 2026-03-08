import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import useAxios from "../Hooks/useAxios";
import { AuthContext } from "../Provider/AuthContext";
export default function Register() {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [photoURL, setPhotoURL] = useState("");
    const axiosInstance = useAxios();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const formData = new FormData(form);
    //     const { email, password, ...userProfile } = Object.fromEntries(formData.entries());
    //     console.log(email, password, userProfile);
    //     //
    //     createUser(email, password)
    //         .then(async (result) => {
    //             const loggedUser = result.user;
    //             console.log(loggedUser);




    //             // update userinfo in the database
    //             const userInfo = {
    //                 email: e.email,
    //                 role: "user",
    //                 created_at: new Date().toISOString(),
    //                 last_log_in: new Date().toISOString()
    //             };
    //             const userRes = await axiosInstance.post("/users", userInfo);
    //             console.log(userRes.data);




    //             // update user profile in firebase (authprovier ar pora)
    //             const userProfile = {
    //                 displayName: e.name,
    //                 photoURL: photoURL
    //             }
    //             updateUserProfile(userProfile)
    //                 .then(() => {
    //                     console.log("user profile updated successfully");
    //                 })
    //                 .catch((error) => {
    //                     console.log("error updating user profile", error.message);
    //                 });


    //             form.reset();
    //         })
    //         .catch((error) => {
    //             console.log("error", error.message);
    //         });
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const { email, password, name } = Object.fromEntries(formData.entries()); // extract name too
        console.log(email, password, name);

        try {
            // 1️⃣ Create user in Firebase Auth
            const result = await createUser(email, password);
            const loggedUser = result.user;
            console.log('Firebase user:', loggedUser);

            // 2️⃣ Send user info to backend MongoDB
            const userInfo = {
                email,
                role: "user",
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString(),
                displayName: name,       // optional: store name in backend too
                photoURL: photoURL || "" // make sure photoURL is defined
            };

            const userRes = await axiosInstance.post("/users", userInfo);
            console.log('Backend response:', userRes.data);

            
            // 3️⃣ Update Firebase user profile
            await updateUserProfile({
                displayName: name,
                photoURL: photoURL || ""
            });
            console.log("User profile updated successfully in Firebase");

            form.reset();

        } catch (error) {
            console.error("Error creating user:", error.message);
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        const res = await axios.post(imageUploadUrl, formData);
        // setPhotoURL(res.data.imageUrl);
        setPhotoURL(res.data.data.display_url);
    }

    return (
        <div className="min-h-screen  px-4 py-28">
            {/* Outer container */}
            <div className=" mx-auto">
                {/* Glass card */}
                <div className="backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 transition-transform hover:scale-[1.02]">
                    <h2 className="text-4xl font-bold text-center mb-6 ">
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
                                type="file"
                                onChange={handleImageUpload}
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