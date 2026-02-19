import React from "react";
import { FaBrain, FaImage, FaRobot, FaNetworkWired, FaMicrochip } from "react-icons/fa";

function ResearchInterest({ interests }) {
    // Default interests if no props passed
    const defaultInterests = [
        { name: "Machine Learning", icon: <FaBrain /> },
        { name: "Image Processing", icon: <FaImage /> },
        { name: "Artificial Intelligence", icon: <FaRobot /> },
        { name: "Software Defined Networking", icon: <FaNetworkWired /> },
        { name: "Internet of Things (IoT)", icon: <FaMicrochip /> },
    ];

    const list = interests || defaultInterests;

    return (
        <div className="md:col-span-3 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 rounded-2xl p-8 shadow-xl backdrop-blur-lg border border-indigo-200">

            <ul className="flex flex-col gap-5 font-poppins">
                {list.map((interest, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white/80 rounded-xl shadow-md hover:shadow-2xl border-l-4 border-indigo-500 transition-transform transform hover:scale-105 cursor-pointer group"
                    >
                        <span className="text-indigo-600 text-2xl group-hover:rotate-12 transition-transform duration-300">
                            {interest.icon}
                        </span>
                        <span className="text-gray-800 font-semibold group-hover:text-indigo-700 transition-colors duration-300">
                            {interest.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ResearchInterest;