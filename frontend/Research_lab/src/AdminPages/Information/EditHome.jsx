import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { resolveBackendAssetUrl } from "../../utils";

const IMGBB_KEY = import.meta.env.VITE_image_upload_key;

const uploadToImgbb = async (file) => {
  if (!file || typeof file === "string") return file;

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.data.url;
};

const queryClient = new QueryClient();

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <EditHome />
    </QueryClientProvider>
  );
}

function EditHome() {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [welcomeImageFile, setWelcomeImageFile] = useState(null);
  const [aboutImageFile, setAboutImageFile] = useState(null);
  const [welcomeImagePreview, setWelcomeImagePreview] = useState("");
  const [aboutImagePreview, setAboutImagePreview] = useState("");

  // ============================
  // ✅ GET DATA (like AdminContact)
  // ============================
  const { data: home, isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const res = await axios.get("/welcomehome");
      return res.data;
    },
  });

  // ============================
  // ✅ UPDATE (POST = UPSERT)
  // ============================
  const updateMutation = useMutation({
    mutationFn: async (data) => await axiosSecure.post("/welcomehome", data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homeData"] });
      setWelcomeImageFile(null);
      setAboutImageFile(null);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Home page updated successfully.",
        confirmButtonColor: "#4f46e5",
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  // ============================
  // ✅ HANDLE SUBMIT (LIKE YOUR CONTACT FORM)
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const welcomeImageUrl = welcomeImageFile
        ? await uploadToImgbb(welcomeImageFile)
        : home?.welcomeImage || "";

      const aboutImageUrl = aboutImageFile
        ? await uploadToImgbb(aboutImageFile)
        : home?.aboutImage || "";

      const payload = {
        welcomeTitle: form.welcomeTitle.value || "",
        welcomeSubtitle: form.welcomeSubtitle.value || "",
        aboutTitle: form.aboutTitle.value || "",
        aboutDescription: form.aboutDescription.value || "",
        aboutButtonName: form.aboutButtonName.value || "",
        aboutButtonLink: form.aboutButtonLink.value || "",
        welcomeImage: welcomeImageUrl,
        aboutImage: aboutImageUrl,
      };

      updateMutation.mutate(payload);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed!",
        text: error.message || "Failed to upload image",
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // ============================
  // ✅ UI
  // ============================
  return (
    <div className="mx-auto p-6 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          🏠 Edit Home Page
        </h1>
        <p className="text-gray-600">Manage your homepage content and images</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-3xl shadow-xl p-8 space-y-8"
      >
        {/* ================= Welcome Section ================= */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👋</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-800">
              Welcome Section
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Welcome Title
              </label>
              <input
                name="welcomeTitle"
                defaultValue={home?.welcomeTitle}
                type="text"
                placeholder="Enter welcome title"
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Welcome Subtitle
              </label>
              <input
                name="welcomeSubtitle"
                defaultValue={home?.welcomeSubtitle}
                type="text"
                placeholder="Enter subtitle"
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Welcome Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setWelcomeImageFile(file);
                  setWelcomeImagePreview(file ? URL.createObjectURL(file) : "");
                }}
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {(welcomeImagePreview || home?.welcomeImage) && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <img
                    src={welcomeImagePreview || resolveBackendAssetUrl(home?.welcomeImage)}
                    alt="Welcome preview"
                    className="h-32 w-48 rounded-lg object-cover border-2 border-blue-300 shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= About Section ================= */}
        <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">👨‍🏫</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-800">
              About Section
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                About Title
              </label>
              <input
                name="aboutTitle"
                defaultValue={home?.aboutTitle}
                type="text"
                placeholder="Enter about title"
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                About Description
              </label>
              <textarea
                name="aboutDescription"
                defaultValue={home?.aboutDescription}
                rows="5"
                placeholder="Enter about description"
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-vertical"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Name
                </label>
                <input
                  name="aboutButtonName"
                  defaultValue={home?.aboutButtonName}
                  type="text"
                  placeholder="Enter button text"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  name="aboutButtonLink"
                  defaultValue={home?.aboutButtonLink}
                  type="text"
                  placeholder="Enter button link"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                About Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setAboutImageFile(file);
                  setAboutImagePreview(file ? URL.createObjectURL(file) : "");
                }}
                className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {(aboutImagePreview || home?.aboutImage) && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <img
                    src={aboutImagePreview || resolveBackendAssetUrl(home?.aboutImage)}
                    alt="About preview"
                    className="h-32 w-48 rounded-lg object-cover border-2 border-blue-300 shadow-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= Buttons ================= */}
        <div className="flex justify-end gap-4 pt-6 border-t-2 border-blue-200">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-8 py-3 border-2 border-blue-300 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
          >
            🔄 Cancel
          </button>

          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {updateMutation.isPending ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                💾 Update
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}