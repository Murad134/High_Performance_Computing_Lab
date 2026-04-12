// import React, { useEffect } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const AdminEditProfessor = () => {
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     const { register, handleSubmit, reset } = useForm({
//         defaultValues: {
//             head: { picture: "", name: "", position: "", education: { bsc: "", msc: "", phd: "" }, teachingStartYear: "", department: "", university: "" },
//             deputy: { picture: "", name: "", position: "", education: { bsc: "", msc: "", phd: "" }, teachingStartYear: "", department: "", university: "" },
//         },
//     });

//     /* ================= GET ================= */
//     const { data: professorData, isLoading } = useQuery({
//         queryKey: ["professor"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/aboutprof");
//             return res.data;
//         },
//     });

//     /* ================= KEY FIX ================= */
//     useEffect(() => {
//         if (professorData) {
//             reset(professorData); // backend theke data ashle form populate korbe
//         }
//     }, [professorData, reset]);

//     /* ================= UPDATE ================= */
//     const mutation = useMutation({
//         mutationFn: async (updatedData) => {
//             const res = await axiosSecure.put("/aboutprof", updatedData);
//             return res.data;
//         },
//     });

//     const onSubmit = async (data) => {
//         try {
//             await mutation.mutateAsync(data);
//             Swal.fire({ icon: "success", title: "Updated Successfully!", timer: 1500, showConfirmButton: false });
//             queryClient.invalidateQueries({ queryKey: ["professor"] }); // v5 syntax
//         } catch (err) {
//             console.error("Update failed:", err);
//             Swal.fire({ icon: "error", title: "Update Failed!" });
//         }
//     };

//     if (isLoading) return <p className="text-center mt-10">Loading...</p>;

//     return (
//         <div className="mx-auto bg-gradient-to-br rounded-2xl p-10">
//             <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center tracking-wide">
//                 Edit Professor Information
//             </h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
//                 {/* ================= Head of Lab ================= */}
//                 <div>
//                     <h3 className="text-2xl font-semibold text-indigo-600 mb-6 border-b pb-2">
//                         Head of Lab
//                     </h3>
//                     <div className="space-y-6">
//                         <div>
//                             <label className="font-medium text-gray-700">Picture URL</label>
//                             <input
//                                 {...register("head.picture")}
//                                 placeholder="Enter Head Picture URL"
//                                 className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                             />
//                         </div>
//                         <div>
//                             <label className="font-medium text-gray-700">Name</label>
//                             <input
//                                 {...register("head.name")}
//                                 placeholder="Enter Name"
//                                 className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                             />
//                         </div>
//                         <div>
//                             <label className="font-medium text-gray-700">Position / Designation</label>
//                             <select
//                                 {...register("head.position")}
//                                 className="select select-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                             >
//                                 <option value="">Select Position</option>
//                                 <option value="Head of Lab">Head of Lab</option>
//                                 <option value="Deputy Head of Lab">Deputy Head of Lab</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="font-semibold text-gray-800 text-lg">Education</label>
//                             <div className="grid md:grid-cols-3 gap-4 mt-3">
//                                 <input
//                                     {...register("head.education.bsc")}
//                                     placeholder="BSc"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                                 />
//                                 <input
//                                     {...register("head.education.msc")}
//                                     placeholder="MSc"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                                 />
//                                 <input
//                                     {...register("head.education.phd")}
//                                     placeholder="PhD"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                                 />
//                                 <label className="font-semibold text-gray-800 text-lg">Teaching Start Year</label>

//                             </div>
//                             <div>
//                                 <input
//                                     {...register("head.teachingStartYear")}
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                                 />
//                             </div>
//                         </div>
//                         <div className="grid md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="font-medium text-gray-700">Department Name</label>
//                                 <input
//                                     {...register("head.department")}
//                                     placeholder="Department Name"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="font-medium text-gray-700">University Name</label>
//                                 <input
//                                     {...register("head.university")}
//                                     placeholder="University Name"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ================= Deputy Head ================= */}
//                 <div>
//                     <h3 className="text-2xl font-semibold text-purple-600 mb-6 border-b pb-2">
//                         Deputy Head of Lab
//                     </h3>
//                     <div className="space-y-6">
//                         <div>
//                             <label className="font-medium text-gray-700">Picture URL</label>
//                             <input
//                                 {...register("deputy.picture")}
//                                 placeholder="Enter Deputy Picture URL"
//                                 className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                             />
//                         </div>
//                         <div>
//                             <label className="font-medium text-gray-700">Name</label>
//                             <input
//                                 {...register("deputy.name")}
//                                 placeholder="Enter Name"
//                                 className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                             />
//                         </div>
//                         <div>
//                             <label className="font-medium text-gray-700">Position / Designation</label>
//                             <select
//                                 {...register("deputy.position")}
//                                 className="select select-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                             >
//                                 <option value="">Select Position</option>
//                                 <option value="Head of Lab">Head of Lab</option>
//                                 <option value="Deputy Head of Lab">Deputy Head of Lab</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="font-semibold text-gray-800 text-lg">Education</label>
//                             <div className="grid md:grid-cols-3 gap-4 mt-3">
//                                 <input
//                                     {...register("deputy.education.bsc")}
//                                     placeholder="BSc"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                                 />
//                                 <input
//                                     {...register("deputy.education.msc")}
//                                     placeholder="MSc"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                                 />
//                                 <input
//                                     {...register("deputy.education.phd")}
//                                     placeholder="PhD"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                                 />
//                             </div>
//                         </div>
//                         <div className="grid md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="font-medium text-gray-700">Department Name</label>
//                                 <input
//                                     {...register("deputy.department")}
//                                     placeholder="Department Name"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="font-medium text-gray-700">University Name</label>
//                                 <input
//                                     {...register("deputy.university")}
//                                     placeholder="University Name"
//                                     className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="flex justify-end">
//                     <button
//                         type="submit"
//                         disabled={mutation.isLoading}
//                         className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//                     >
//                         {mutation.isLoading ? "Updating..." : "Update"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AdminEditProfessor;












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

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="mx-auto bg-gradient-to-br rounded-2xl p-10">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center tracking-wide">
        Edit Professor Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

        {/* ================= Head of Lab ================= */}
        <div>
          <h3 className="text-2xl font-semibold text-indigo-600 mb-6 border-b pb-2">
            Head of Lab
          </h3>
          <div className="space-y-6">

            {/* ✅ Head Image Upload */}
            <div>
              <label className="font-medium text-gray-700">Picture</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setHeadImageFile(file);
                  setHeadImagePreview(URL.createObjectURL(file));
                }}
                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
              />
              {headImagePreview && (
                <img
                  src={headImagePreview}
                  alt="Head Preview"
                  className="mt-2 h-24 w-24 rounded-full object-cover border-2 border-indigo-300"
                />
              )}
            </div>

            <div>
              <label className="font-medium text-gray-700">Name</label>
              <input
                {...register("head.name")}
                placeholder="Enter Name"
                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Position / Designation</label>
              <select
                {...register("head.position")}
                className="select select-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Position</option>
                <option value="Head of Lab">Head of Lab</option>
                <option value="Deputy Head of Lab">Deputy Head of Lab</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-gray-800 text-lg">Education</label>
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <input {...register("head.education.bsc")} placeholder="BSc" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400" />
                <input {...register("head.education.msc")} placeholder="MSc" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400" />
                <input {...register("head.education.phd")} placeholder="PhD" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400" />
                <label className="font-semibold text-gray-800 text-lg">Teaching Start Year</label>
              </div>
              <div>
                <input {...register("head.teachingStartYear")} className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Department Name</label>
                <input {...register("head.department")} placeholder="Department Name" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div>
                <label className="font-medium text-gray-700">University Name</label>
                <input {...register("head.university")} placeholder="University Name" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Deputy Head ================= */}
        <div>
          <h3 className="text-2xl font-semibold text-purple-600 mb-6 border-b pb-2">
            Deputy Head of Lab
          </h3>
          <div className="space-y-6">

            {/* ✅ Deputy Image Upload */}
            <div>
              <label className="font-medium text-gray-700">Picture</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setDeputyImageFile(file);
                  setDeputyImagePreview(URL.createObjectURL(file));
                }}
                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
              />
              {deputyImagePreview && (
                <img
                  src={deputyImagePreview}
                  alt="Deputy Preview"
                  className="mt-2 h-24 w-24 rounded-full object-cover border-2 border-purple-300"
                />
              )}
            </div>

            <div>
              <label className="font-medium text-gray-700">Name</label>
              <input {...register("deputy.name")} placeholder="Enter Name" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="font-medium text-gray-700">Position / Designation</label>
              <select {...register("deputy.position")} className="select select-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400">
                <option value="">Select Position</option>
                <option value="Head of Lab">Head of Lab</option>
                <option value="Deputy Head of Lab">Deputy Head of Lab</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-gray-800 text-lg">Education</label>
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <input {...register("deputy.education.bsc")} placeholder="BSc" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400" />
                <input {...register("deputy.education.msc")} placeholder="MSc" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400" />
                <input {...register("deputy.education.phd")} placeholder="PhD" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Department Name</label>
                <input {...register("deputy.department")} placeholder="Department Name" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400" />
              </div>
              <div>
                <label className="font-medium text-gray-700">University Name</label>
                <input {...register("deputy.university")} placeholder="University Name" className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {mutation.isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProfessor;