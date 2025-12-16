import React from "react";
import { FaFlask, FaBullseye, FaEye } from "react-icons/fa";

function LabAbout() {
    return (
        <div className="md:col-span-6 font-poppins">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center md:text-left">
                HPC Research Lab
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg font-medium text-gray-600 leading-snug mb-10 text-center md:text-left">
                Department of Computer Science and Engineering (CSE) <br />
                Jashore University of Science and Technology (JUST), Bangladesh
            </h2>

            {/* Timeline */}
            <div className="relative border-l-4 border-indigo-500 pl-6 space-y-12">
                {/* Step 1 - Lab Intro */}
                <div className="relative">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white"></div>
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-indigo-700">
                        <FaFlask /> Lab Introduction
                    </h3>
                    <p className="text-gray-700 leading-relaxed mt-2">
                        The <span className="font-semibold">High Performance Computing (HPC) Lab</span> at JUST
                        is dedicated to advanced computing research. It unites students and faculty to explore
                        parallel computing, AI, and big data solutions for real‑world challenges.
                    </p>
                </div>

                {/* Step 2 - Mission & Vision */}
                <div className="relative">
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-purple-500 rounded-full border-4 border-white"></div>
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-purple-700">
                        <FaBullseye /> Mission & <FaEye /> Vision
                    </h3>
                    <ul className="text-gray-700 leading-relaxed list-disc list-inside mt-2 space-y-1">
                        <li>
                            Our mission is to foster a culture of curiosity, collaboration, and excellence in HPC
                            research. We empower students with hands‑on experience and impactful publications.
                        </li>
                        <li>
                            Our vision is to become a nationally recognized research hub, collaborating with
                            academia and industry to solve global challenges using HPC technologies.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LabAbout;
