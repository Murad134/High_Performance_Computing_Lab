import React from "react";

export default function AdminPlatformFormUI() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center">
        Add / Update Experimental Platform
      </h2>

      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">

        {/* Name & Full Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Platform Name" placeholder="Creativ'Lab" />
          <Input label="Full Name" placeholder="Cyber-Physical Systems and Robotics Creativ'Lab" />
        </div>

        {/* Abbreviation & Scope */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Abbreviation" placeholder="LHS" />
          <Input label="Scope" placeholder="European-level / National-level" />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Description</label>
          <textarea
            rows="4"
            placeholder="A unique place for innovation, where multiple research activities converge..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Research Areas & Expertise Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Research Areas (comma separated)" placeholder="drones, robotics, grids..." />
          <Input label="Expertise Fields (comma separated, optional)" placeholder="computer virology, network analysis..." />
        </div>

        {/* Website URLs */}
        <Input label="Website URLs (comma separated, optional)" placeholder="https://platform.com, https://github.com/platform" />

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Platform
          </button>

          <button
            type="button"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Platform
          </button>
        </div>
      </form>
    </section>
  );
}

/* ================= Reusable Input ================= */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <label className="font-semibold text-gray-700">{label}</label>
      <input
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    </div>
  );
}
