import React from 'react'

function AlumniDetails({ item }) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">

            {/* Student Picture */}
            <div className="w-9/12 mx-auto ">
                <img
                    src={item.studentImg}
                    alt={item.studentName}
                    className="w-full h-56 object-cover border border-blue-100 my-2 rounded-md"
                />
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Name */}
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {item.studentName}
                </h2>

                {/* Session */}
                <p className="text-sm text-gray-600 mb-3">
                    <span className="font-bold text-green-600">Session:</span> {item.session}
                </p>

                {/* Thesis / Project Title */}
                <h3 className="text-md font-semibold text-gray-700 text-left mt-2 mb-4">
                    Title: {item.name}
                </h3>
            </div>
        </div>
    )
}

export default AlumniDetails
