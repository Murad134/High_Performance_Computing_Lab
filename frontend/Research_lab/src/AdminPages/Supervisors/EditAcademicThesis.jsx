import React from "react";
export default function AdminAddThesisForm() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
        Add New Thesis
      </h2>

      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
        {/* ================= Thesis Info ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Thesis Title" name="title" />
          <Input label="Publication Name" name="publicationName" />
          <Input label="Publication Date" name="publicationDate" placeholder="YYYY-MM-DD" />
          <Input label="Publication Pages" name="publicationPages" placeholder="12-28" />
          <Input label="Start Date" name="startDate" placeholder="YYYY-MM-DD" />
          <Input label="Thesis Image URL" name="thesisImage" placeholder="/images/thesis/thesis1.png" />
        </div>


        {/* ================= Student Info ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Student Name" name="studentName" />
          <Input label="Session" name="studentSession" placeholder="2021-22" />

          {/* Student Level + Department Side by Side */}
          <div className="flex gap-3 w-full col-span-2">
            <div className="flex-1 flex flex-col gap-1">
              <label className="font-semibold text-gray-700">Student Level</label>
              <select
                name="studentLevel"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Level</option>
                <option value="BSc">BSc</option>
                <option value="MSc">MSc</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="font-semibold text-gray-700">Department</label>
              <input
                type="text"
                name="department"
                placeholder="Computer Science & Engineering (CSE)"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
        {/* ================= Abstract & Keywords ================= */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Keywords (comma separated)
          </label>
          <input
            type="text"
            name="keywords"
            placeholder="Deep Learning, Image Segmentation, Medical AI"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">
            Abstract
          </label>
          <textarea
            rows="4"
            name="abstract"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* ================= Submit Button ================= */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Thesis
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
