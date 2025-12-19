import React from "react";

export default function AdminOtherAndFederProjects() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center">
        Add / Update Other Country & FEDER Projects
      </h2>

      {/* ================= Other Country Projects ================= */}
      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6 mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Other Country Project
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Project ID" placeholder="Unique project ID" />
          <Input label="Project Name" placeholder="Project Name" />
        </div>

        <Input label="Description" placeholder="Project description" />
        <Input label="Focus Area" placeholder="Cybersecurity, AI, Robotics, etc." />
        <Input label="Type" placeholder="Other Country" />

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Project
          </button>

          <button
            type="button"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Project
          </button>
        </div>
      </form>

      {/* ================= FEDER Funded Projects ================= */}
      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          FEDER Funded Project
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Project ID" placeholder="Unique project ID" />
          <Input label="Project Name" placeholder="Project Name" />
        </div>

        <Input label="Full Name" placeholder="Full project name if any" />
        <Input label="Description" placeholder="Project description" />
        <Input label="Focus Area" placeholder="Bioinformatics, AI, Health, etc." />
        <Input label="Type" placeholder="FEDER" />

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Project
          </button>

          <button
            type="button"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Project
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