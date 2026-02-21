import React from "react";

export default function AlumniCard({ item, onUpdate }) {
    // Handle converting alumni back to current student
    const handleBackToCurrent = () => {
        const updatedStudent = {
            ...item,
            isAlumni: false
        };
        onUpdate(updatedStudent);
    };

    return (
        <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300">
            {/* Alumni Picture */}
            <figure className="px-4 pt-4">
                <img
                    src={item.studentImg}
                    alt={item.studentName}
                    className="rounded-xl h-48 w-full object-cover"
                />
            </figure>

            <div className="card-body p-4">
                {/* Alumni Name */}
                <h2 className="card-title text-lg">
                    {item.studentName}
                    <div className="badge badge-accent">Alumni</div>
                </h2>

                {/* Roll and Session */}
                <div className="flex justify-between items-center my-2">
                    <span className="py-1 text-sm">
                        Roll: {item.roll}
                    </span>
                    <span className="py-1 text-sm">
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
                    {/* Back to Current Students Button */}
                    <button
                        onClick={handleBackToCurrent}
                        className="btn btn-sm bg-blue-400 hover:bg-blue-600 p-2 text-white border-none flex items-center gap-2"
                    >
                        {/* Back Arrow Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                        Back to Current
                    </button>
                </div>
            </div>
        </div>
    );
}