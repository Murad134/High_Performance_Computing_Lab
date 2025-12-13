import React, { useState } from "react";

export default function AdminStudentForm() {
  const [formData, setFormData] = useState({
    type: "thesis",
    name: "",
    studentLevel: "",
    studentName: "",
    session: "",
    roll: "",
    projectImage: "",
    studentImg: "",
    technologies: "",
    details: "",
    startDate: "",
    endDate: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
    };
    console.log("Form Submitted:", payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-6 shadow-lg rounded-2xl overflow-hidden bg-white flex flex-col transition-all duration-200 hover:shadow-xl"
    >
      {/* Heading */}
      <div className="bg-blue-600 py-4 text-center">
        <h2 className="text-xl font-bold text-white tracking-wide">
          ➕ Add New Student
        </h2>
      </div>

      <div className="p-6 flex flex-col gap-4">

        {/* Student Name */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Student Name</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter student name"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Roll + Session */}
        <div className="flex gap-3 w-full">
          <div className="flex-1 flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Roll</label>
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              placeholder="Enter roll number"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Session</label>
            <input
              type="text"
              name="session"
              value={formData.session}
              onChange={handleChange}
              placeholder="e.g. 23-24"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Student Level + Department */}
        <div className="flex gap-3 w-full">
          <div className="flex-1 flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Student Level</label>
            <select
              name="studentLevel"
              value={formData.studentLevel}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
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
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        {/* Project / Thesis Title */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Project / Thesis Title</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter title"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        {/* Student Image */}
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Student Image URL</label>
          <input
            type="text"
            name="studentImg"
            value={formData.studentImg}
            onChange={handleChange}
            placeholder="Enter student image link"
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Details */}
        {/* <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Project Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            placeholder="Write about the project"
            className="border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-400"
          />
        </div> */}

        
        {/* <div className="flex gap-3 w-full">

          <div className="flex-1 flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Start Date</label>
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              placeholder="5/2/2025"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="font-semibold text-gray-700">End Date</label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              placeholder="10/12/2025"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

        </div> */}


        {/* Submit */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg"
          >
            Add Student
          </button>
        </div>
      </div>
    </form>
  );
}
