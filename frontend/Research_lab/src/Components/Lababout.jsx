import React from "react";
import { FaFlask, FaBullseye, FaEye } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

function LabAbout() {
    const axiosInstance = useAxios();

    const { data: lababout, isLoading, isError } = useQuery({
        queryKey: ["lababout"],
        queryFn: async () => {
            const res = await axiosInstance.get("/aboutlab");
            return res.data;
        },
    });

    if (isLoading) return <p>Loading lababout...</p>;
    if (isError || !lababout) return null;

    return (
        <div className="md:col-span-6 font-poppins">
            {/* 🔹 Lab Name */}
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center md:text-left">
                {lababout.labName}
            </h1>

            {/* 🔹 Department + University */}
            <h2 className="text-lg font-medium text-gray-600 leading-snug mb-10 text-center md:text-left">
                {lababout.department} <br />
                {lababout.university}
            </h2>

            {/* 🔹 Timeline Section */}
            <div className="relative border-l-4 border-indigo-500 pl-6 space-y-12">

                {/* 🔸 Lab Introduction */}
                <div className="relative">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white"></div>

                    <h3 className="flex items-center gap-2 text-xl font-semibold text-indigo-700">
                        <FaFlask /> Lab Introduction
                    </h3>

                    <p className="text-gray-700 leading-relaxed mt-2">
                        {lababout.labIntroduction}
                    </p>
                </div>

                {/* 🔸 Mission & Vision */}
                <div className="relative">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-purple-500 rounded-full border-4 border-white"></div>

                    <h3 className="flex items-center gap-2 text-xl font-semibold text-purple-700">
                        <FaBullseye /> Mission & <FaEye /> Vision
                    </h3>

                    <ul className="text-gray-700 leading-relaxed list-disc list-inside mt-2 space-y-2">
                        <li>{lababout.mission}</li>
                        <li>{lababout.vision}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default LabAbout;