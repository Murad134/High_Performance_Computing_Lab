import React from "react";

export default function AdminAddProjectForm() {
    return (
        <section className="max-w-6xl mx-auto p-4 sm:p-6">
            <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
                Add New Project
            </h2>

            <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
                {/* ================= Project Info ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Project Title" name="name" />
                    <Input label="Student Name" name="studentName" />
                    <Input label="Session" name="session" placeholder="23-24" />
                    <Input label="Roll" name="roll" />
                    <Input label="Project Image URL" name="projectImage" placeholder="/images/ecommerce.jpg" />
                    <Input label="Student Image URL" name="studentImg" placeholder="/students/imran.jpg" />
                </div>

                {/* ================= Student Level + Department ================= */}
                <div className="flex gap-3 w-full">
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
                        <label className="font-semibold text-gray-700">Start Date</label>
                        <input
                            type="text"
                            name="startDate"
                            placeholder="YYYY-MM-DD (e.g. 2023-01-01)"
                            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
                {/* ================= Start & End Date ================= */}
                <div className="flex gap-3 w-full">
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

                {/* ================= Technologies ================= */}
                <div>
                    <label className="font-semibold text-gray-700 mb-1 block">
                        Technologies (comma separated)
                    </label>
                    <input
                        type="text"
                        name="technologies"
                        placeholder="React, Node.js, MongoDB"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* ================= Details ================= */}
                <div>
                    <label className="font-semibold text-gray-700 mb-1 block">
                        Project Details
                    </label>
                    <textarea
                        rows="4"
                        name="details"
                        placeholder="Full-stack e-commerce system."
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                    />
                </div>


                {/* ================= Submit Button ================= */}
                <div className="flex justify-end pt-6">
                    <button
                        type="button"
                        className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Add Project
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
