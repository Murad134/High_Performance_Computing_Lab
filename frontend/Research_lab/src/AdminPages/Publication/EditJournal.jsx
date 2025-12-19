import React from "react";

export default function AdminAddJournalForm() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
        Add New Journal
      </h2>

      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
        {/* ================= Year ================= */}
        <div className="max-w-sm">
          <label className="font-semibold text-gray-700 mb-1 block">Year</label>
          <input
            type="text"
            name="year"
            placeholder="2025"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ================= Journal Info ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Journal Title" name="title" />
          <Input label="Journal Name" name="journal" />
          <Input label="Volume" name="volume" />
          <Input label="Issue" name="issue" />
          <Input label="Pages" name="pages" placeholder="1050-1064" />
          <Input label="URL" name="url" placeholder="https://..." />
        </div>

        {/* ================= Submit Button ================= */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Journal
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
