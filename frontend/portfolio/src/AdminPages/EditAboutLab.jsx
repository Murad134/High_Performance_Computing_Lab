import React, { useState } from "react";

export default function AdminAboutForm() {
  const [formData,] = useState({
    bioTimeline: [{ title: "", description: "", color: "" }],
    researchInterests: [""],
  });

  return (
    <section className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Admin – Update Professor About Section
      </h2>

      <form className="space-y-6">
        {/* Name */}
        <div>
          <label className="font-semibold block mb-1">Professor Name</label>
          <input
            type="text"
            name="name"
            placeholder="Sk. Shalauddin Kabir"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Designation */}
        <div>
          <label className="font-semibold block mb-1">Designation</label>
          <input
            type="text"
            name="designation"
            placeholder="Lecturer, Department of CSE"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Workplace */}
        <div>
          <label className="font-semibold block mb-1">Workplace</label>
          <input
            type="text"
            name="workplace"
            placeholder="Jashore University of Science and Technology (JUST)"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {/* Timeline Steps */}
        <div className="bg-indigo-50 p-5 rounded-lg">
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">Timeline Steps</h3>

          {formData.bioTimeline.map((step, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4 bg-white">
              <label className="block font-semibold mb-1">Step Title</label>
              <input
                type="text"
                placeholder="Lecturer (JUST)"
                value={step.title}
                className="w-full border rounded-lg p-3 mb-3"
              />

              <label className="block font-semibold mb-1">Description</label>
              <textarea
                placeholder="Joined JUST as a Lecturer..."
                value={step.description}
                className="w-full border rounded-lg p-3 mb-3"
              />

              <label className="block font-semibold mb-1">Timeline Color</label>
              <input
                type="text"
                placeholder="e.g. indigo, purple, green"
                value={step.color}
                className="w-full border rounded-lg p-3 mb-3"
              />

              <button
                type="button"
                className="text-red-600 font-semibold"
              >
                Remove Step
              </button>
            </div>
          ))}

          <button
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Step
          </button>
        </div>

        {/* Research Interests */}
        <div className="bg-purple-50 p-5 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Research Interests</h3>

          {formData.researchInterests.map((interest, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Machine Learning"
                value={interest}
                className="flex-1 border rounded-lg p-3"
              />
              <button
                type="button"
                className="text-red-600 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Interest
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold"
        >
          Save About Section
        </button>
      </form>
    </section>
  );
}
