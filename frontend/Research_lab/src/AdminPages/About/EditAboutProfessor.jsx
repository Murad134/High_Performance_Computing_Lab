
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const IMGBB_KEY = import.meta.env.VITE_image_upload_key;

/* ================= Upload to imgbb ================= */
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
  return data.data.url; // ✅ string URL
};

const AdminEditProfessor = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      head: { picture: "", name: "", position: "", education: { bsc: "", msc: "", phd: "" }, teachingStartYear: "", department: "", university: "" },
      deputy: { picture: "", name: "", position: "", education: { bsc: "", msc: "", phd: "" }, teachingStartYear: "", department: "", university: "" },
    },
  });

  // ✅ image states
  const [headImageFile, setHeadImageFile] = useState(null);
  const [headImagePreview, setHeadImagePreview] = useState("");
  const [deputyImageFile, setDeputyImageFile] = useState(null);
  const [deputyImagePreview, setDeputyImagePreview] = useState("");

  /* ================= GET ================= */
  const { data: professorData, isLoading } = useQuery({
    queryKey: ["professor"],
    queryFn: async () => {
      const res = await axiosSecure.get("/aboutprof");
      return res.data;
    },
  });

  useEffect(() => {
    if (professorData) {
      reset(professorData);
      // ✅ set existing image previews from DB
      setHeadImagePreview(professorData.head?.picture || "");
      setDeputyImagePreview(professorData.deputy?.picture || "");
    }
  }, [professorData, reset]);

  /* ================= UPDATE ================= */
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put("/aboutprof", updatedData);
      return res.data;
    },
  });

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    try {
      // ✅ upload new images if selected, else keep existing URL
      const headPicture = headImageFile
        ? await uploadToImgbb(headImageFile)
        : headImagePreview || "";

      const deputyPicture = deputyImageFile
        ? await uploadToImgbb(deputyImageFile)
        : deputyImagePreview || "";

      const payload = {
        ...data,
        head: { ...data.head, picture: headPicture },
        deputy: { ...data.deputy, picture: deputyPicture },
      };

      await mutation.mutateAsync(payload);
      Swal.fire({ icon: "success", title: "Updated Successfully!", timer: 1500, showConfirmButton: false });
      queryClient.invalidateQueries({ queryKey: ["professor"] });
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire({ icon: "error", title: "Update Failed!" });
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-blue-600 font-semibold">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            👨‍🏫 Professor Management
          </h1>
          <p className="text-gray-600">Update head and deputy head information</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🎓</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-800">
                Edit Professor Information
              </h2>
              <p className="text-gray-600">Manage laboratory leadership details</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ================= Head of Lab ================= */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">👨‍🏫</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-800">
                Head of Lab
              </h3>
            </div>

            <div className="space-y-6">
              {/* ✅ Head Image Upload */}
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📸 Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setHeadImageFile(file);
                    setHeadImagePreview(URL.createObjectURL(file));
                  }}
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {headImagePreview && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={headImagePreview}
                      alt="Head Preview"
                      className="h-32 w-32 rounded-full object-cover border-4 border-blue-300 shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Full Name
                  </label>
                  <input
                    {...register("head.name")}
                    placeholder="Enter Full Name"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎯 Position / Designation
                  </label>
                  <select
                    {...register("head.position")}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="">Select Position</option>
                    <option value="Head of Lab">Head of Lab</option>
                    <option value="Deputy Head of Lab">Deputy Head of Lab</option>
                  </select>
                </div>
              </div>

              {/* Education */}
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">🎓 Education Background</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BSc</label>
                    <input
                      {...register("head.education.bsc")}
                      placeholder="Bachelor's Degree"
                      className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">MSc</label>
                    <input
                      {...register("head.education.msc")}
                      placeholder="Master's Degree"
                      className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PhD</label>
                    <input
                      {...register("head.education.phd")}
                      placeholder="Doctorate Degree"
                      className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Teaching Start Year
                  </label>
                  <input
                    {...register("head.teachingStartYear")}
                    placeholder="Year started teaching"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Institution Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏛️ Department Name
                  </label>
                  <input
                    {...register("head.department")}
                    placeholder="Department Name"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎓 University Name
                  </label>
                  <input
                    {...register("head.university")}
                    placeholder="University Name"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= Deputy Head ================= */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">👨‍🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-800">
                Deputy Head of Lab
              </h3>
            </div>

            <div className="space-y-6">
              {/* ✅ Deputy Image Upload */}
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📸 Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setDeputyImageFile(file);
                    setDeputyImagePreview(URL.createObjectURL(file));
                  }}
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {deputyImagePreview && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={deputyImagePreview}
                      alt="Deputy Preview"
                      className="h-32 w-32 rounded-full object-cover border-4 border-blue-300 shadow-lg"
                    />
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Full Name
                  </label>
                  <input
                    {...register("deputy.name")}
                    placeholder="Enter Full Name"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎯 Position / Designation
                  </label>
                  <select
                    {...register("deputy.position")}
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="">Select Position</option>
                    <option value="Head of Lab">Head of Lab</option>
                    <option value="Deputy Head of Lab">Deputy Head of Lab</option>
                  </select>
                </div>
              </div>

              {/* Education */}
              <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                <h4 className="text-lg font-semibold text-blue-800 mb-4">🎓 Education Background</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">BSc</label>
                    <input
                      {...register("deputy.education.bsc")}
                      placeholder="Bachelor's Degree"
                      className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">MSc</label>
                    <input
                      {...register("deputy.education.msc")}
                      placeholder="Master's Degree"
                      className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PhD</label>
                    <input
                      {...register("deputy.education.phd")}
                      placeholder="Doctorate Degree"
                      className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Institution Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🏛️ Department Name
                  </label>
                  <input
                    {...register("deputy.department")}
                    placeholder="Department Name"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎓 University Name
                  </label>
                  <input
                    {...register("deputy.university")}
                    placeholder="University Name"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t-2 border-blue-200">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  💾 Update Information
                </span>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProfessor;