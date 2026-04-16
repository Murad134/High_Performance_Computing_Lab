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
    <div className="mx-auto p-6">

      {/* ===== Welcome Images ===== */}
      <div className="mb-10 border p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Welcome Images</h2>

        <form onSubmit={handleSubmitWelcome(onSubmitWelcome)}>
          <input type="hidden" {...registerWelcome("id")} />
          <input type="file" multiple {...registerWelcome("files")} />

          <div className="flex gap-2 mt-2">
            {Array.from(welcomeFiles).map((file, i) => (
              <img key={i} src={URL.createObjectURL(file)} className="h-20 w-20 rounded" />
            ))}
          </div>

          <button className="bg-green-600 text-white px-6 py-2 mt-3 rounded">
            {watchWelcome("id") ? "Update" : "Upload"}
          </button>
          {watchWelcome("id") && (
            <button
              type="button"
              onClick={handleCancelWelcomeEdit}
              className="ml-2 bg-gray-500 text-white px-6 py-2 mt-3 rounded"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {welcomeImages.map((img) => (
            <div key={img._id} className="relative">
              <img src={resolveBackendAssetUrl(img.imageUrl)} className="h-32 w-full object-cover rounded" />
              <button
                onClick={() => handleEditWelcome(img)}
                className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteWelcome(img._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Award Images ===== */}
      <div className="border p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Awards & Achievements</h2>

        <form onSubmit={handleSubmitAward(onSubmitAward)}>
          <input type="hidden" {...registerAward("id")} />
          <input {...registerAward("title")} placeholder="Title" className="border w-full p-2 mb-2" />
          <input type="file" multiple {...registerAward("files")} />

          <div className="flex gap-2 mt-2">
            {Array.from(awardFiles).map((file, i) => (
              <img key={i} src={URL.createObjectURL(file)} className="h-20 w-20 rounded" />
            ))}
          </div>

          <button className="bg-indigo-600 text-white px-6 py-2 mt-3 rounded">
            {watchAward("id") ? "Update" : "Upload"}
          </button>
        </form>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {awardImages.map((img) => (
            <div key={img._id} className="border rounded">
              <img src={resolveBackendAssetUrl(img.imageUrl)} className="h-40 w-full object-cover" />
              <div className="p-3">
                <p>{img.title}</p>
                <div className="flex justify-between mt-2">
                  <button onClick={() => handleEditAward(img)} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDeleteAward(img._id)} className="text-red-600">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}