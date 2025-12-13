import React, { useState } from "react";

export default function AdminLabAboutForm() {
  const [formData, setFormData] = useState({
    labIntro: "",
    mission: "",
    vision: "",
    researchInterests: [""],
  });

  // Handlers
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInterestChange = (index, value) => {
    const updated = [...formData.researchInterests];
    updated[index] = value;
    setFormData({ ...formData, researchInterests: updated });
  };

  const addInterest = () => {
    setFormData({ ...formData, researchInterests: [...formData.researchInterests, ""] });
  };

  const removeInterest = (index) => {
    const updated = formData.researchInterests.filter((_, i) => i !== index);
    setFormData({ ...formData, researchInterests: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lab About Data:", formData);
    alert("Lab About Section saved! Check console.");
  };

  return (
    <section className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg font-poppins">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Admin – HPC Lab About Section
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Lab Introduction */}
        <div>
          <label className="font-semibold block mb-1">Lab Introduction</label>
          <textarea
            value={formData.labIntro}
            onChange={(e) => handleChange("labIntro", e.target.value)}
            placeholder="The High Performance Computing (HPC) Lab at JUST is dedicated to advanced computing research..."
            className="w-full border rounded-lg p-3"
            rows={4}
            required
          />
        </div>

        {/* Mission */}
        <div>
          <label className="font-semibold block mb-1">Mission</label>
          <textarea
            value={formData.mission}
            onChange={(e) => handleChange("mission", e.target.value)}
            placeholder="Our mission is to foster a culture of curiosity, collaboration, and excellence in HPC research..."
            className="w-full border rounded-lg p-3"
            rows={3}
            required
          />
        </div>

        {/* Vision */}
        <div>
          <label className="font-semibold block mb-1">Vision</label>
          <textarea
            value={formData.vision}
            onChange={(e) => handleChange("vision", e.target.value)}
            placeholder="Our vision is to become a nationally recognized research hub..."
            className="w-full border rounded-lg p-3"
            rows={3}
            required
          />
        </div>

        {/* Research Interests */}
        <div className="bg-purple-50 p-5 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Research Interests</h3>
          {formData.researchInterests.map((interest, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="e.g. Machine Learning"
                value={interest}
                onChange={(e) => handleInterestChange(index, e.target.value)}
                className="flex-1 border rounded-lg p-3"
              />
              <button
                type="button"
                className="text-red-600 font-semibold"
                onClick={() => removeInterest(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={addInterest}
          >
            + Add Interest
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold"
        >
          Save Lab About Section
        </button>
      </form>
    </section>
  );
}
