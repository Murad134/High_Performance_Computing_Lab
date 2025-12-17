import React from "react";
import { Link } from "react-router-dom";

export default function CardThesis({
  item,
  activeTab,
  onMarkComplete,
  onMarkIncomplete
}) {
  const { id } = item;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-300 transition duration-300 ease-in-out flex flex-col gap-4 justify-between h-full">
      {/* Thesis Title */}
      {/* <h3 className="text-lg font-semibold text-gray-900 px-3 py-3 border-b border-gray-200">
        {item.title}
      </h3> */}
      <h3 className="text-lg font-semibold text-gray-900 px-3 py-3 border-b border-gray-300 min-h-[150px] flex items-center">
        {item.title}
      </h3>

      <div className="px-3 ">
        <p className="text-gray-700">
          <span className="font-semibold">Student:</span> {item.studentName}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Program:</span> {item.studentLevel}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Session:</span> {item.studentSession}
        </p>
      </div>
      {/* Date Info */}
      <div className="text-sm text-gray-600 px-3">
        {activeTab === "current" ? (
          <>📅 Started: {item.startDate}</>
        ) : (
          <>📅 {item.startDate} — {item.endDate}</>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto px-3 pb-3 flex items-center gap-2">
        <Link
          to={`/supervison/thesis/${id}`}
          state={{ updatedThesis: item }}
          className="text-indigo-600 text-sm font-medium hover:underline"        >
          READ MORE →
        </Link>

        {activeTab === "current" ? (
          <button
            onClick={() => {
              onMarkComplete(id);
            }}
            className="ml-auto bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"          >
            Complete
          </button>
        ) : (
          <button
            onClick={() => {

              onMarkIncomplete(id);
            }}
            className="ml-auto bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"          >
            Not Complete
          </button>
        )}
      </div>
    </div>
  );
}