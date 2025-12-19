// import React from 'react'

// function EditNavigation() {
//   return (
//     <div>EditNavigation</div>
//   )
// }

// export default EditNavigation

import React from "react";

export default function AdminAddNavigationForm() {
  return (
    <section className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
        Add Navigation Link
      </h2>

      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
        {/* ================= Navigation Title ================= */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Departments"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ================= Navigation Path ================= */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Path</label>
          <input
            type="text"
            name="path"
            placeholder="/researchs/departments"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ================= Submit Button ================= */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Navigation Link
          </button>
        </div>
      </form>
    </section>
  );
}
