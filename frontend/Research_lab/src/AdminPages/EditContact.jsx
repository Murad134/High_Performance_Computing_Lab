import React, { useState } from "react";

export default function AdminContactForm() {
  const [contactData, setContactData] = useState({
    room: "",
    department: "",
    building: "",
    university: "",
    cityZip: "",
    email: "",
    linkedin: "",
    facebook: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Data Submitted:", contactData);
    // API call / update database logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-2xl overflow-hidden p-6 flex flex-col gap-6"
    >
      <h2 className="text-xl font-bold text-gray-800">General Information</h2>

      {/* Room No */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="room">Room No:</label>
        <input
          type="text"
          id="room"
          name="room"
          value={contactData.room}
          onChange={handleChange}
          placeholder="e.g., 405"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      {/* Department */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
          value={contactData.department}
          onChange={handleChange}
          placeholder="e.g., Computer Science"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      {/* Building */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="building">Building:</label>
        <input
          type="text"
          id="building"
          name="building"
          value={contactData.building}
          onChange={handleChange}
          placeholder="e.g., Engineering Block"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* University */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="university">University:</label>
        <input
          type="text"
          id="university"
          name="university"
          value={contactData.university}
          onChange={handleChange}
          placeholder="e.g., ABC University"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* City-Zip */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="cityZip">City - Zip:</label>
        <input
          type="text"
          id="cityZip"
          name="cityZip"
          value={contactData.cityZip}
          onChange={handleChange}
          placeholder="e.g., Dhaka - 1207"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={contactData.email}
          onChange={handleChange}
          placeholder="example@university.edu"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-4">Social Media Information</h2>

      {/* LinkedIn */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="linkedin">LinkedIn:</label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          value={contactData.linkedin}
          onChange={handleChange}
          placeholder="https://www.linkedin.com/in/username"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Facebook */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700" htmlFor="facebook">Facebook:</label>
        <input
          type="url"
          id="facebook"
          name="facebook"
          value={contactData.facebook}
          onChange={handleChange}
          placeholder="https://www.facebook.com/username"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Update Contact
        </button>
      </div>
    </form>
  );
}
