import React from "react";

export default function AdminAddDepartmentForm() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
        Add New Department
      </h2>

      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">

        {/* ================= Department Name & Slug ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Department Name" name="name" placeholder="Formal Methods" />
          <Input label="Slug" name="slug" placeholder="formal-methods" />
        </div>

        {/* ================= HCERES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="HCERES Period" name="hceresPeriod" placeholder="2016-2021" />
          <Input label="HCERES Document URL" name="documentUrl" placeholder="/docs/fm-hceres.pdf" />
          <Input label="Portfolio URL" name="portfolioUrl" placeholder="/portfolio/fm" />
        </div>

        {/* ================= Details ================= */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Presentation</label>
          <textarea
            rows="4"
            name="presentation"
            placeholder="Research on mathematical methods for specification, verification and validation of software and hardware systems."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ================= Head Name ================= */}
        <div className="max-w-sm">
          <Input label="Head Name" name="headName" placeholder="Claire Dubois" />
        </div>

        {/* ================= Teams & Keywords ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Teams (comma separated)" name="teams" placeholder="VERIF, LOGIC, SECU, MOOVE" />
          <Input label="Keywords (comma separated)" name="keywords" placeholder="Formal verification, Model checking, Software security" />
        </div>

        {/* ================= Colloquium Year ================= */}
        <div className="max-w-sm">
          <Input label="Colloquium Year" name="colloquiumYear" placeholder="2025" />
        </div>

        {/* ================= Submit Button ================= */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Department
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
