

import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

export default function EditImageSlider() {
  const axios = useAxios();

  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    files: [],
    previews: [],
  });

  // ✅ LOAD FROM BACKEND
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("/images");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // TITLE
  const handleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
  };

  // FILE SELECT
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      files,
      previews,
    });
  };

  // RESET
  const resetForm = () => {
    setFormData({
      title: "",
      files: [],
      previews: [],
    });
    setEditId(null);
  };

  // ✅ SUBMIT (ADD + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Title required");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);

      // ✏️ EDIT
      if (editId) {
        if (formData.files.length > 0) {
          data.append("image", formData.files[0]);
        }

        await axios.put(`/images/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // update UI
        setImages((prev) =>
          prev.map((img) =>
            img._id === editId
              ? {
                ...img,
                title: formData.title,
              }
              : img
          )
        );
      } else {
        // ➕ ADD MULTIPLE
        if (formData.files.length === 0) {
          alert("Select images");
          return;
        }

        formData.files.forEach((file) => {
          data.append("images", file);
        });

        const res = await axios.post("/images", data, {
          headers: { "Content-Type": "multipart/form-data", res },
        });

        // reload list
        fetchImages();
      }

      resetForm();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this image?");
    if (!confirm) return;

    await axios.delete(`/images/${id}`);

    // remove instantly
    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  // ✏️ EDIT CLICK
  const handleEdit = (img) => {
    setFormData({
      title: img.title,
      files: [],
      previews: [`http://localhost:2500${img.imageUrl}`],
    });

    setEditId(img._id);
  };

  return (
    <div className="mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Awards & Achievements Image Management
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p-6 mb-10 space-y-4 border rounded"
      >
        <input
          type="text"
          placeholder="Image Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* PREVIEW */}
        <div className="flex gap-2 flex-wrap">
          {formData.previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="preview"
              className="h-20 w-20 object-cover rounded"
            />
          ))}
        </div>

        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          {editId ? "Update Image" : "Upload Images"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <img
              src={`http://localhost:2500${img.imageUrl}`}
              alt={img.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <p className="text-sm font-medium mb-3">{img.title}</p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(img)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(img._id)}
                  className="text-red-600 text-sm"
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