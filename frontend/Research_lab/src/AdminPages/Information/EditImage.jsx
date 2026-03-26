import React, { useState } from "react";

export default function EditImageSlider() {
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    files: [],
    previews: [],
  });

  const [editId, setEditId] = useState(null);

  // TITLE
  const handleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  // MULTIPLE FILE SELECT
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      files,
      previews,
    });
  };

  // ADD or UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || formData.previews.length === 0) return;

    // EDIT MODE
    if (editId) {
      setImages(
        images.map((img) =>
          img.id === editId
            ? {
                ...img,
                title: formData.title,
                imageUrl: formData.previews[0], // update first image
              }
            : img
        )
      );
      setEditId(null);
    } else {
      // ADD MULTIPLE IMAGES
      const newImages = formData.previews.map((preview, index) => ({
        id: Date.now() + index,
        title: formData.title,
        imageUrl: preview,
      }));

      setImages([...images, ...newImages]);
    }

    // RESET
    setFormData({
      title: "",
      files: [],
      previews: [],
    });
  };

  // DELETE
  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  // EDIT
  const handleEdit = (img) => {
    setFormData({
      title: img.title,
      files: [],
      previews: [img.imageUrl],
    });
    setEditId(img.id);
  };

  return (
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Awards & Achievements Image Management
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className=" rounded-lg p-6 mb-10 space-y-4"
      >
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 w-full border px-4 py-2 rounded-md"
          />
        </div>

        {/* MULTIPLE FILE */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 w-full"
          />
        </div>

        {/* PREVIEW */}
        <div className="flex gap-3 flex-wrap">
          {formData.previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="preview"
              className="h-24 w-24 object-cover rounded-md"
            />
          ))}
        </div>

        <button className="bg-indigo-600 text-white px-6 py-2 rounded-md">
          {editId ? "Update Image" : "Upload Images"}
        </button>
      </form>

      {/* IMAGE LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  border-t border-red-700 pt-6">
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

            <div className="p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">
                {img.title}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(img)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(img.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}