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

    if (isLoading) return (
        <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
        </div>
    );
    if (isError || !lababout) return null;

    return (
        <div className="md:col-span-6 font-poppins">
            {/* 🔹 Lab Name */}
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-8 text-center md:text-left">
                {lababout.labName}
            </h1>

            {/* 🔹 Department + University */}
            <h2 className="text-lg font-medium text-teal-600 leading-snug mb-10 text-center md:text-left">
                {lababout.department} <br />
                {lababout.university}
            </h2>

            {/* 🔹 Timeline Section */}
            <div className="relative border-l-4 border-teal-500 pl-6 space-y-12">

                {/* 🔸 Lab Introduction */}
                <div className="relative">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-teal-500 rounded-full border-4 border-white shadow-lg"></div>

                    <h3 className="flex items-center gap-2 text-xl font-semibold text-teal-700">
                        <FaFlask className="text-teal-600" /> Lab Introduction
                    </h3>

                    <p className="text-slate-700 leading-relaxed mt-2">
                        {lababout.labIntroduction}
                    </p>
                </div>

                {/* 🔸 Mission & Vision */}
                <div className="relative">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-cyan-500 rounded-full border-4 border-white shadow-lg"></div>

                    <div className="text-slate-700 leading-relaxed mt-2 space-y-4">

                        {/* 🔹 Mission */}
                        <div>
                            <h4 className="flex items-center gap-2 text-xl font-semibold text-teal-700">
                                <FaBullseye className="text-teal-600" />Mission:
                            </h4>
                            <ul className="space-y-2">
                                {lababout.mission
                                    ?.split(".")
                                    .map((item, index) =>
                                        item.trim() && (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-teal-600">🎯</span>
                                                <span>{item.trim()}.</span>
                                            </li>
                                        )
                                    )}
                            </ul>

                        </div>

                        {/* 🔹 Vision */}
                        <div>
                            <h4 className="flex items-center gap-2 text-xl font-semibold text-cyan-700">
                                <FaEye className="text-cyan-600" />Vision:
                            </h4>
                            <ul className="space-y-2">
                                {lababout.vision
                                    ?.split(".")
                                    .map((item, index) =>
                                        item.trim() && (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-cyan-600">🌟</span>
                                                <span>{item.trim()}.</span>
                                            </li>
                                        )
                                    )}
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LabAbout;