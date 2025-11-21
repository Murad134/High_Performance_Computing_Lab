import React from "react";

export default function StudentCard({ item }) {
    return (
        <div className="shadow-lg rounded-2xl overflow-hidden bg-white flex flex-col">

            {/* 1. Student Picture - Full Width + Border */}
            <div className="w-9/12 mt-2 mb-1 mx-auto border border-blue-100 rounded-md">
                <img
                    src={item.studentImg}
                    alt={item.studentName}
                    className="w-full h-48 object-cover p-1 rounded-md"
                />
            </div>
            {/* Card Content */}
            <div className="p-4 flex flex-col flex-1">

                {/* 2. Student Name (Left-aligned) */}
                <h2 className="text-lg font-bold text-gray-800 mb-2">{item.studentName}</h2>

                {/* 3. Roll (left) and Session (right) */}
                <div className="w-full flex justify-between mb-3 text-sm">
                    <span className="text-blue-600 font-medium">Roll: {item.roll}</span>
                    <span className="text-green-600 font-medium">Session: {item.session}</span>
                </div>

                {/* 4. Thesis/Project Title */}
                <h3 className="text-md font-semibold text-gray-700 text-left mt-2 mb-4">
                    Title: {item.name}
                </h3>

                {/* 5. Completed Button - Bottom Right */}
                <div className="flex justify-end mt-auto">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                        Completed
                    </button>
                </div>
            </div>
        </div>
    );
}