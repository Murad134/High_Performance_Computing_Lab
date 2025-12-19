import React from "react";

export default function EditAbout() {
  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Edit About Section
      </h2>

      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        {/* Lab Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lab Name
          </label>
          <input
            type="text"
            placeholder="HPC Research Lab"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department & University
          </label>
          <textarea
            rows="3"
            placeholder="Department of Computer Science and Engineering (CSE), Jashore University of Science and Technology (JUST), Bangladesh"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Lab Introduction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lab Introduction
          </label>
          <textarea
            rows="4"
            placeholder="Write short introduction about the lab..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Mission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mission
          </label>
          <textarea
            rows="3"
            placeholder="Write lab mission..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Vision */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vision
          </label>
          <textarea
            rows="3"
            placeholder="Write lab vision..."
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
