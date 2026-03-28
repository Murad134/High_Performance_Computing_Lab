import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

export default function EditImageSlider() {
  const axios = useAxios();
  const queryClient = useQueryClient();

  // ===========================
  // FORMS
  // ===========================
  const {
    register: registerAward,
    handleSubmit: handleSubmitAward,
    reset: resetAward,
    setValue: setAwardValue,
    watch: watchAward
  } = useForm();

  const {
    register: registerWelcome,
    handleSubmit: handleSubmitWelcome,
    reset: resetWelcome,
    watch: watchWelcome
  } = useForm();

  const awardFiles = watchAward("files") || [];
  const welcomeFiles = watchWelcome("files") || [];

  // ===========================
  // QUERIES
  // ===========================
  const { data: awardImages = [], refetch: refetchAward } = useQuery({
    queryKey: ["awardImages"],
    queryFn: async () => {
      const res = await axios.get("/images");
      return res.data;
    }
  });

  const { data: welcomeImages = [], refetch: refetchWelcome } = useQuery({
    queryKey: ["welcomeImages"],
    queryFn: async () => {
      const res = await axios.get("/images/welcome"); // matches backend
      return res.data;
    }
  });

  // ===========================
  // MUTATIONS
  // ===========================
  const addAwardMutation = useMutation({
    mutationFn: async (formData) =>
      axios.post("/images", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }),
    onSuccess: () => {
      refetchAward();
      resetAward();
    }
  });

  const updateAwardMutation = useMutation({
    mutationFn: async ({ id, formData }) =>
      axios.put(`/images/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }),
    onSuccess: () => {
      refetchAward();
      resetAward();
    }
  });

  const deleteAwardMutation = useMutation({
    mutationFn: async (id) => axios.delete(`/images/${id}`),
    onSuccess: () => refetchAward()
  });

  const addWelcomeMutation = useMutation({
    mutationFn: async (formData) =>
      axios.post("/images/welcome", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      }),
    onSuccess: () => {
      refetchWelcome();
      resetWelcome();
    }
  });

  const deleteWelcomeMutation = useMutation({
    mutationFn: async (id) => axios.delete(`/images/welcome/${id}`),
    onSuccess: () => refetchWelcome()
  });

  // ===========================
  // HANDLERS
  // ===========================
  const onSubmitAward = (data) => {
    if (!data.title) {
      alert("Title is required");
      return;
    }
    if (!data.files?.length && !data.id) {
      alert("Please select image(s)");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    if (data.files) {
      Array.from(data.files).forEach((file) => formData.append("images", file));
    }

    if (data.id) {
      updateAwardMutation.mutate({ id: data.id, formData });
    } else {
      addAwardMutation.mutate(formData);
    }
  };

  const onSubmitWelcome = (data) => {
    if (!data.files?.length) {
      alert("Please select image(s)");
      return;
    }
    const formData = new FormData();
    Array.from(data.files).forEach((file) => formData.append("images", file));
    addWelcomeMutation.mutate(formData);
  };

  const handleEditAward = (img) => {
    setAwardValue("title", img.title);
    setAwardValue("id", img._id);
  };

  const handleDeleteAward = (id) => {
    if (window.confirm("Delete this image?")) {
      deleteAwardMutation.mutate(id);
    }
  };

  const handleDeleteWelcome = (id) => {
    if (window.confirm("Delete this image?")) {
      deleteWelcomeMutation.mutate(id);
    }
  };

  // ===========================
  // RENDER
  // ===========================
  return (
    <div className="mx-auto p-6">

      {/* ================= WELCOME IMAGE ================= */}
      <div className="mb-10 border p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Welcome Images</h2>

        <form onSubmit={handleSubmitWelcome(onSubmitWelcome)} className="space-y-4">
          <input type="file" multiple accept="image/*" {...registerWelcome("files")} />

          <div className="flex gap-2 flex-wrap mt-2">
            {welcomeFiles &&
              Array.from(welcomeFiles).map((file, i) => (
                <img key={i} src={URL.createObjectURL(file)} className="h-20 w-20 object-cover rounded" />
              ))}
          </div>

          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Upload Welcome Images
          </button>
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {welcomeImages.map((img) => (
            <div key={img._id} className="relative">
              <img
                src={`http://localhost:2500${img.imageUrl}`}
                className="h-32 w-full object-cover rounded"
              />
              <button
                onClick={() => handleDeleteWelcome(img._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= AWARD IMAGES ================= */}
      <div className="mb-10 border p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Awards & Achievements</h2>

        <form onSubmit={handleSubmitAward(onSubmitAward)} className="space-y-4">
          <input type="hidden" {...registerAward("id")} />
          <input type="text" placeholder="Add Image Title" {...registerAward("title")} className="w-full border px-4 py-2 rounded" />
          <input type="file" multiple accept="image/*" {...registerAward("files")} />

          <div className="flex gap-2 flex-wrap mt-2">
            {awardFiles &&
              Array.from(awardFiles).map((file, i) => (
                <img key={i} src={URL.createObjectURL(file)} className="h-20 w-20 object-cover rounded" />
              ))}
          </div>

          <button className="bg-indigo-600 text-white px-6 py-2 rounded">
            {watchAward("id") ? "Update Image" : "Upload Images"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {awardImages.map((img) => (
            <div key={img._id} className="border rounded-lg overflow-hidden shadow-sm">
              <img src={`http://localhost:2500${img.imageUrl}`} alt={img.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <p className="text-sm font-medium mb-3">{img.title}</p>
                <div className="flex justify-between">
                  <button onClick={() => handleEditAward(img)} className="text-blue-600 text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteAward(img._id)} className="text-red-600 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}