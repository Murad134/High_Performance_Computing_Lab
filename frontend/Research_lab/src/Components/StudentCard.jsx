import React from "react";
import { Link } from "react-router-dom";

export default function StudentCard({ item }) {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            {/* Student Picture */}
            <figure className="px-4 pt-4">
                <img
                    src={item.studentImg}
                    alt={item.studentName}
                    className="rounded-xl h-48 w-full object-cover"
                />
            </figure>

            <div className="card-body p-4">
                {/* Student Name */}
                <h2 className="card-title text-lg">
                    {item.studentName}
                    {item.isAlumni && (
                        <div className="badge badge-secondary">Alumni</div>
                    )}
                </h2>

                {/* Roll and Session */}
                <div className="flex justify-between items-center my-2">
                    <span className=" py-1 text-sm">
                        Roll: {item.roll}
                    </span>
                    <span className=" py-1 text-sm">
                        Session: {item.session}
                    </span>
                </div>

                {/* Thesis Title */}
                <p className="text-sm text-base-content/70 line-clamp-2">
                    <span className="font-semibold text-base text-primary">Title:</span> {item.name}{" "}
                    <span className="text-xs font-medium text-secondary">
                        ({item.type === "thesis" ? "Thesis" : "Project"})
                    </span>
                </p>
                {/* Action Buttons */}
                <div className="card-actions justify-end gap-5 mt-4">
                    {/* Completed Button */}
                    <button className="btn btn-sm bg-green-400 hover:bg-green-600 p-2 text-white border-none flex items-center gap-2">
                        {/* Tick Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Completed
                    </button>

                    {/* Delete Button */}
                    <button className="btn btn-sm bg-red-400 hover:bg-red-600 p-2 text-white border-none flex items-center gap-2">
                        {/* Trash Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 14H5L4 7z" />
                        </svg>
                        Delete
                    </button>
                </div>

            </div>
        </div>
    );
}

