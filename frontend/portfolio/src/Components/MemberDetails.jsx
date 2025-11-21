import React from "react";

function MemberDetailsCard({ student }) {
    const { picture, name, roll, session, title } = student;

    return (
        <div className="max-w-sm w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Student Picture */}
            <img
                src={picture}
                alt={name}
                className="w-full h-48 object-cover"
            />

            {/* Card Content */}
            <div className="p-4">
                {/* Name */}
                <h2 className="text-lg font-bold text-gray-800">{name}</h2>

                {/* Roll & Session */}
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Roll:</span> {roll}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold">Session:</span> {session}
                </p>

                {/* Project/Thesis Title */}
                <p className="text-sm text-gray-700 mt-3">
                    <span className="font-semibold">Project/Thesis:</span> {title}
                </p>
            </div>
        </div>
    );
}

export default MemberDetailsCard;
