import React from "react";

export default function AdminEditFooter() {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 text-indigo-700">
        Admin Panel – Edit Footer
      </h2>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-10">

        {/* ================= Lab Info ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Lab Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Lab Name
              </label>
              <input
                type="text"
                placeholder="HPC Research Lab"
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description / Tagline
              </label>
              <textarea
                rows="3"
                placeholder="Inspiring innovation and advancing research..."
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* ================= Contact ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Contact Information
          </h3>

          <div className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="sks.kabir@just.edu.bd"
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* Office Address - 3 Parts */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Office Address
              </label>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Room (e.g. Room 224)"
                  className="border rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Department (Dept. of CSE)"
                  className="border rounded-md px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="University / Location (JUST, Jashore-7408)"
                  className="border rounded-md px-4 py-2"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ================= Social Links ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Social Media
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Facebook
              </label>
              <input
                type="url"
                placeholder="https://facebook.com/..."
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                GitHub
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                className="border rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>
        </div>

        {/* ================= Copyright ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Copyright Text
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1">
              Footer Bottom Text
            </label>
            <input
              type="text"
              placeholder="© 2025 HPC Research Lab — All rights reserved."
              className="w-full border rounded-md px-4 py-2"
            />
          </div>
        </div>

        {/* ================= Buttons ================= */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Update Footer
          </button>
        </div>

      </div>
    </section>
  );
}
