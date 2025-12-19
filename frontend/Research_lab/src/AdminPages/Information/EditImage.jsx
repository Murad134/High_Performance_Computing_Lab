// import React from 'react'

// function EditImage() {
//     return (
//         <div>EditImage</div>
//     )
// }

// export default EditImage
import React, { useState } from "react";

export default function EditImageSlider() {
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Best Research Award 2023",
      imageUrl: "/images/award1.jpg",
    },
    {
      id: 2,
      title: "Conference Achievement",
      imageUrl: "/images/award2.jpg",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // add new image
  const handleAddImage = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.imageUrl) return;

    setImages([
      ...images,
      {
        id: Date.now(),
        title: formData.title,
        imageUrl: formData.imageUrl,
      },
    ]);

    setFormData({ title: "", imageUrl: "" });
  };

  // delete image
  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Edit Image Slider (Awards & Achievements)
      </h2>

      {/* Add Image Form */}
      <form
        onSubmit={handleAddImage}
        className="bg-white shadow-md rounded-lg p-6 mb-10 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Title / Caption
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Best Paper Award 2024"
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="/images/award.jpg or https://..."
            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
        >
          Add Image
        </button>
      </form>

      {/* Existing Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                {img.title}
              </p>
              <button
                onClick={() => handleDelete(img.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
