// import React from 'react'

// function EditTeams() {
//     return (
//         <div>EditTeams</div>
//     )
// }

// export default EditTeams

import React from "react";

export default function AdminAddUpdateTeamForm() {
  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
        Add / Update Research Team
      </h2>

      <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">

        {/* ================= Team Name & Full Name ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Team Name" name="name" placeholder="ABC" />
          <Input label="Full Name" name="fullName" placeholder="Algorithms, Biology, Complexity" />
        </div>

        {/* ================= Department ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Department Name" name="departmentName" placeholder="Department 1" />
          <Input label="Department Full Name" name="departmentFullName" placeholder="Algorithms, computation, image and geometry" />
        </div>

        {/* ================= Description & Presentation ================= */}
        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Description</label>
          <textarea
            rows="2"
            name="description"
            placeholder="Machine Learning and Computational Biology"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700 mb-1 block">Presentation</label>
          <textarea
            rows="4"
            name="presentation"
            placeholder="The goal of the statistical learning theory is to specify the conditions under which it is possible to learn from empirical data..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ================= Leader ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Leader Name" name="leaderName" placeholder="Yann Guermeur" />
          <Input label="Leader Email" name="leaderEmail" placeholder="yann.guermeur@loria.fr" />
        </div>

        {/* ================= Research Activities / Software / Collaborations / Keywords ================= */}
        <div>
          <Input
            label="Research Activities (comma separated)"
            name="researchActivities"
            placeholder="Theory and practice of large margin classifiers, Learning piecewise smooth functions"
          />
          <Input
            label="Software (comma separated)"
            name="software"
            placeholder="HECTAR, M-SVM, MSVMpack"
          />
          <Input
            label="Collaborations (comma separated)"
            name="collaborations"
            placeholder="CITI Department, TELECOM SudParis, Center for Imaging Science..."
          />
          <Input
            label="Keywords (comma separated)"
            name="keywords"
            placeholder="Statistical learning theory, kernel methods, data mining"
          />
          <Input
            label="Website URLs (comma separated)"
            name="website"
            placeholder="https://teamwebsite.com, https://github.com/team"
          />
        </div>

        {/* ================= Submit Button ================= */}
        <div className="flex justify-end pt-4">
          <button
            type="button"
            className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add / Update Team
          </button>
        </div>
      </form>
    </section>
  );
}

/* ================= Reusable Input ================= */
function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-1 mt-2">
      <label className="font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    </div>
  );
}
