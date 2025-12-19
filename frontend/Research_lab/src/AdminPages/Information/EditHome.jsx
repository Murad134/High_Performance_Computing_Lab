// import React from 'react'

// function EditHome() {
//   return (
//     <div>EditHome</div>
//   )
// }

// export default EditHome

import React, { useState } from "react";

export default function EditHome() {

  const [successMessage, setSuccessMessage] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);

    // Show success message
    setSuccessMessage("✅ Data saved successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };


  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          🏠 Edit Home Page Content
        </h1>
        <p className="text-slate-600">
          Update welcome section and about section content
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
            <span className="text-3xl">👋</span>
            <h2 className="text-2xl font-bold text-slate-800">Welcome Section</h2>
          </div>

          <div className="space-y-5">
            {/* Welcome Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Welcome Title
              </label>
              <input
                type="text"
                name="welcomeTitle"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Enter welcome title"
                required
              />
            </div>

            {/* Welcome Subtitle */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Welcome Subtitle
              </label>
              <input
                type="text"
                name="welcomeSubtitle"
                // value={formData.welcomeSubtitle}
                // onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Enter subtitle"
                required
              />
            </div>

            {/* Button Name & Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Button Name
                </label>
                <input
                  type="text"
                  name="welcomeButtonName"
                  // value={formData.welcomeButtonName}
                  // onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="e.g., Learn More"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  name="welcomeButtonLink"
                  // value={formData.welcomeButtonLink}
                  // onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="e.g., /about"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
            <span className="text-3xl">👨‍🏫</span>
            <h2 className="text-2xl font-bold text-slate-800">About Section</h2>
          </div>

          <div className="space-y-5">
            {/* About Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                About Title
              </label>
              <input
                type="text"
                name="aboutTitle"
                // value={formData.aboutTitle}
                // onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                placeholder="Enter about title"
                required
              />
            </div>

            {/* About Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                About Description
              </label>
              <textarea
                name="aboutDescription"
                // value={formData.aboutDescription}
                // onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
                placeholder="Enter description"
                required
              />
            </div>

            {/* Button Name & Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Button Name
                </label>
                <input
                  type="text"
                  name="aboutButtonName"
                  // value={formData.aboutButtonName}
                  // onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="e.g., Read More"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  name="aboutButtonLink"
                  // value={formData.aboutButtonLink}
                  // onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="e.g., /about"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            💾 Update
          </button>
        </div>
      </form>
    </div>
  );
}