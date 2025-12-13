import React from "react";
import { Link } from "react-router-dom";

export default function Card({ item }) {

  const {id}=item;
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-300 transition duration-300 ease-in-out flex flex-col gap-4 justify-between h-full">
      {/* Project Image */}
      {item.projectImage && (
        <img
          src={item.projectImage}
          alt={item.name}
          className="w-full h-48 object-cover rounded-md border border-gray-200"
        />
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 px-3">{item.name}</h3>

      {/* Dates */}
      <div className="text-sm text-gray-600 px-3">
        📅 {item.startDate} — {item.endDate}
      </div>

      {/* Read More */}
      <div className="mt-auto">
        <Link
          to={`/publication/projects/${id}`}
          className="px-3 text-indigo-600 text-sm font-medium hover:underline"
        >
          READ MORE →
        </Link>
      </div>
    </div>
  );
}