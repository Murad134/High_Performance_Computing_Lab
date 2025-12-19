// import React from 'react'

// function EditConferences() {
//   return (
//     <div>EditConferences</div>
//   )
// }

// export default EditConferences


import React from "react";

export default function AdminAddConferenceForm() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
        Add New Conference
      </h2>

      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
        {/* ================= Year ================= */}
        <div className="max-w-sm">
          <label className="font-semibold text-gray-700 mb-1 block">Year</label>
          <input
            type="text"
            name="year"
            placeholder="2024"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ================= Conference Info ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Conference Title" name="title" />
          <Input label="Conference Name" name="conference" />
          <Input label="Publisher" name="publisher" />
          <Input label="Volume" name="volume" />
          <Input label="Pages" name="pages" placeholder="601-614" />
          <Input label="URL" name="url" placeholder="https://..." />
        </div>

        {/* ================= Submit Button ================= */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Conference
          </button>
        </div>
      </form>
    </section>
  );
}

/* ================= Reusable Input ================= */
function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    </div>
  );
}
