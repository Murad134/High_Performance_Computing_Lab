import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { resolveBackendAssetUrl } from "../../utils";
import Swal from "sweetalert2";

const IMGBB_KEY = import.meta.env.VITE_image_upload_key;

const uploadToImgbb = async (file) => {
  if (!file || typeof file === "string") return file;

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.data.url;
};

export default function EditImageSlider() {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

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
    setValue: setWelcomeValue,
    watch: watchWelcome
  } = useForm();

  const awardFiles = watchAward("files") || [];
  const welcomeFiles = watchWelcome("files") || [];

  // ================= FETCH =================
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
      const res = await axios.get("/images/welcome");
      return res.data;
    }
  });

  // ================= MUTATIONS =================
  const addAwardMutation = useMutation({
    mutationFn: async (payload) => axiosSecure.post("/images", payload),
    onSuccess: () => {
      refetchAward();
      resetAward();
      Swal.fire("Success!", "Image uploaded successfully", "success");
    },
    onError: (error) => {
      console.error("Upload error:", error);
      Swal.fire("Error!", "Failed to upload image: " + (error.response?.data?.error || error.message), "error");
    }
  });

  const updateAwardMutation = useMutation({
    mutationFn: async ({ id, payload }) =>
      axiosSecure.put(`/images/${id}`, payload),
    onSuccess: () => {
      refetchAward();
      resetAward();
      Swal.fire("Updated!", "Image updated successfully", "success");
    },
    onError: (error) => {
      console.error("Update error:", error);
      Swal.fire("Error!", "Failed to update image: " + (error.response?.data?.error || error.message), "error");
    }
  });

  const deleteAwardMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/images/${id}`),
    onSuccess: () => {
      refetchAward();
      Swal.fire("Deleted!", "Image has been deleted", "success");
    },
    onError: (error) => {
      console.error("Delete error:", error);
      Swal.fire("Error!", "Failed to delete image: " + (error.response?.data?.error || error.message), "error");
    }
  });

  const addWelcomeMutation = useMutation({
    mutationFn: async (payload) => axiosSecure.post("/images/welcome", payload),
    onSuccess: () => {
      refetchWelcome();
      resetWelcome();
      Swal.fire("Success!", "Welcome images uploaded", "success");
    },
    onError: (error) => {
      console.error("Welcome upload error:", error);
      Swal.fire("Error!", "Failed to upload welcome images: " + (error.response?.data?.error || error.message), "error");
    }
  });

  const updateWelcomeMutation = useMutation({
    mutationFn: async ({ id, payload }) =>
      axiosSecure.put(`/images/welcome/${id}`, payload),
    onSuccess: () => {
      refetchWelcome();
      resetWelcome();
      Swal.fire("Updated!", "Welcome image updated successfully", "success");
    },
    onError: (error) => {
      console.error("Welcome update error:", error);
      Swal.fire("Error!", "Failed to update welcome image: " + (error.response?.data?.error || error.message), "error");
    }
  });

  const deleteWelcomeMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/images/welcome/${id}`),
    onSuccess: () => {
      refetchWelcome();
      Swal.fire("Deleted!", "Image removed", "success");
    },
    onError: (error) => {
      console.error("Welcome delete error:", error);
      Swal.fire("Error!", "Failed to delete welcome image: " + (error.response?.data?.error || error.message), "error");
    }
  });

  // ================= SUBMIT =================
  const onSubmitAward = async (data) => {
    if (!data.title) {
      return Swal.fire("Error", "Title is required", "warning");
    }

    if (!data.files?.length && !data.id) {
      return Swal.fire("Error", "Please select image(s)", "warning");
    }

    try {
      const files = data.files ? Array.from(data.files) : [];
      const uploadedUrls = await Promise.all(files.map((file) => uploadToImgbb(file)));

      if (data.id) {
        const payload = {
          title: data.title,
          ...(uploadedUrls[0] ? { imageUrl: uploadedUrls[0] } : {})
        };
        updateAwardMutation.mutate({ id: data.id, payload });
      } else {
        const payload = {
          title: data.title,
          imageUrls: uploadedUrls
        };
        addAwardMutation.mutate(payload);
      }
    } catch {
      Swal.fire("Error", "Image upload failed. Try again.", "error");
    }
  };

  const onSubmitWelcome = async (data) => {
    if (!data.files?.length) {
      return Swal.fire("Error", "Please select image(s)", "warning");
    }

    try {
      const files = Array.from(data.files);
      const uploadedUrls = await Promise.all(files.map((file) => uploadToImgbb(file)));

      if (data.id) {
        const payload = {
          ...(uploadedUrls[0] ? { imageUrl: uploadedUrls[0] } : {})
        };
        updateWelcomeMutation.mutate({ id: data.id, payload });
      } else {
        const payload = {
          imageUrls: uploadedUrls
        };
        addWelcomeMutation.mutate(payload);
      }
    } catch {
      Swal.fire("Error", "Image upload failed. Try again.", "error");
    }
  };

  // ================= ACTIONS =================
  const handleEditAward = (img) => {
    setAwardValue("title", img.title);
    setAwardValue("id", img._id);
  };

  const handleDeleteAward = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This image will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAwardMutation.mutate(id);
      }
    });
  };

  const handleDeleteWelcome = (id) => {
    Swal.fire({
      title: "Delete this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWelcomeMutation.mutate(id);
      }
    });
  };

  const handleEditWelcome = (img) => {
    setWelcomeValue("id", img._id);
  };

  const handleCancelWelcomeEdit = () => {
    resetWelcome();
  };




  // ================= UI =================
  return (
    <div className="mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          🖼️ Image Management
        </h1>
        <p className="text-gray-600">Manage welcome images and awards & achievements</p>
      </div>

      {/* ===== Welcome Images ===== */}
      <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-3xl shadow-xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🏠</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-800">
            Welcome Images
          </h2>
        </div>

        <form onSubmit={handleSubmitWelcome(onSubmitWelcome)} className="mb-8">
          <input type="hidden" {...registerWelcome("id")} />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Images
              </label>
              <input
                type="file"
                multiple
                {...registerWelcome("files")}
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {Array.from(welcomeFiles).length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preview
                </label>
                <div className="flex gap-3 flex-wrap">
                  {Array.from(welcomeFiles).map((file, i) => (
                    <div key={i} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className="h-24 w-24 rounded-lg object-cover border-2 border-blue-300 shadow-md"
                        alt={`Preview ${i + 1}`}
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={addWelcomeMutation.isPending || updateWelcomeMutation.isPending}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {(addWelcomeMutation.isPending || updateWelcomeMutation.isPending) ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    ⬆️ {watchWelcome("id") ? "Update" : "Upload"}
                  </span>
                )}
              </button>

              {watchWelcome("id") && (
                <button
                  type="button"
                  onClick={handleCancelWelcomeEdit}
                  className="px-8 py-3 border-2 border-blue-300 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="border-t-2 border-blue-200 pt-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Current Welcome Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {welcomeImages.map((img) => (
              <div key={img._id} className="bg-white rounded-xl border-2 border-blue-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200">
                <div className="relative">
                  <img
                    src={resolveBackendAssetUrl(img.imageUrl)}
                    className="h-32 w-full object-cover"
                    alt="Welcome"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditWelcome(img)}
                        className="bg-blue-600 text-white px-3 py-1 text-sm rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDeleteWelcome(img._id)}
                        className="bg-red-600 text-white px-3 py-1 text-sm rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {welcomeImages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📷</div>
              <p>No welcome images uploaded yet</p>
            </div>
          )}
        </div>
      </div>

      {/* ===== Award Images ===== */}
      <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🏆</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-800">
            Awards & Achievements
          </h2>
        </div>

        <form onSubmit={handleSubmitAward(onSubmitAward)} className="mb-8">
          <input type="hidden" {...registerAward("id")} />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Award Title
              </label>
              <input
                {...registerAward("title")}
                placeholder="Enter award title"
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Images
              </label>
              <input
                type="file"
                multiple
                {...registerAward("files")}
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {Array.from(awardFiles).length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preview
                </label>
                <div className="flex gap-3 flex-wrap">
                  {Array.from(awardFiles).map((file, i) => (
                    <div key={i} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className="h-24 w-24 rounded-lg object-cover border-2 border-blue-300 shadow-md"
                        alt={`Preview ${i + 1}`}
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={addAwardMutation.isPending || updateAwardMutation.isPending}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {(addAwardMutation.isPending || updateAwardMutation.isPending) ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    ⬆️ {watchAward("id") ? "Update" : "Upload"}
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="border-t-2 border-blue-200 pt-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Current Awards & Achievements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {awardImages.map((img) => (
              <div key={img._id} className="bg-white rounded-xl border-2 border-blue-200 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200">
                <img
                  src={resolveBackendAssetUrl(img.imageUrl)}
                  className="h-40 w-full object-cover"
                  alt={img.title}
                />
                <div className="p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">{img.title}</h4>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => handleEditAward(img)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAward(img._id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {awardImages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🏆</div>
              <p>No awards uploaded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}