// import React from "react";
// import { useForm } from "react-hook-form";

// export default function OtherCountryProjectForm() {

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <div className="mx-auto p-4 sm:p-6  min-h-screen">

//       <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
//         Other Country Project
//       </h2>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className=" rounded-2xl  p-8 space-y-8"
//       >

//         {/* ================= Basic Project Information ================= */}

//         <section>
//           <h3 className="text-xl font-semibold border-b pb-2 mb-4">
//             Basic Project Information
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input
//               label="Project Name *"
//               register={register("projectName", { required: "Project Name required" })}
//               error={errors.projectName}
//             />

//             <Input
//               label="Full Project Name"
//               register={register("fullProjectName")}
//             />

//             <Textarea
//               label="Description"
//               register={register("description")}
//             />

//             <Input
//               label="Focus Area *"
//               register={register("focusArea", {
//                 required: "Focus Area is required"
//               })}
//               error={errors.focusArea}
//             />

//             <Input
//               label="Project Type"
//               value="Other Country"
//               readOnly
//               register={register("projectType")}
//             />

//           </div>
//         </section>

//         {/* ================= Funding Information ================= */}

//         <section>
//           <h3 className="text-xl font-semibold border-b pb-2 mb-4">
//             Funding Information
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <Input
//               label="Funding Program"
//               register={register("fundingProgram")}
//             />

//             <Input
//               label="Funding Organization"
//               register={register("fundingOrganization")}
//             />

//             <Input
//               label="Total Budget"
//               type="number"
//               register={register("totalBudget", {
//                 min: { value: 1, message: "Budget must be positive" }
//               })}
//               error={errors.totalBudget}
//             />

//             <Input
//               label="Grant Amount"
//               type="number"
//               register={register("grantAmount")}
//             />

//             <Input
//               label="Funding Country"
//               register={register("fundingCountry")}
//             />

//           </div>
//         </section>

//         {/* ================= Project Timeline ================= */}

//         <section>
//           <h3 className="text-xl font-semibold border-b pb-2 mb-4">
//             Project Timeline
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//             <Input
//               label="Start Date"
//               type="date"
//               register={register("startDate", { required: "Start date required" })}
//               error={errors.startDate}
//             />

//             <Input
//               label="End Date"
//               type="date"
//               register={register("endDate", { required: "End date required" })}
//               error={errors.endDate}
//             />

//             <Input
//               label="Project Duration"
//               readOnly
//               register={register("duration")}
//             />

//           </div>
//         </section>

//         {/* ================= Team / Partners ================= */}

//         <section>
//           <h3 className="text-xl font-semibold border-b pb-2 mb-4">
//             Project Team / Partners
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <Input
//               label="Lead Institution"
//               register={register("leadInstitution")}
//             />

//             <Textarea
//               label="Partner Institutions"
//               register={register("partnerInstitutions")}
//             />

//             <Input
//               label="Project Coordinator"
//               register={register("coordinator")}
//             />

//             <Textarea
//               label="Research Team Members"
//               register={register("teamMembers")}
//             />

//           </div>
//         </section>

//         {/* ================= Project Outcomes ================= */}

//         <section>
//           <h3 className="text-xl font-semibold border-b pb-2 mb-4">
//             Project Outcomes
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <Textarea label="Publications" register={register("publications")} />

//             <Textarea label="Research Outputs" register={register("outputs")} />

//             <Textarea label="Prototypes / Technology Developed" register={register("prototypes")} />

//             <Textarea label="Reports" register={register("reports")} />

//             <Textarea label="Datasets" register={register("datasets")} />

//           </div>
//         </section>

//         {/* ================= Extra Fields ================= */}

//         <section>
//           <h3 className="text-xl font-semibold border-b pb-2 mb-4">
//             Extra Fields
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             <Input
//               label="Project Website"
//               type="url"
//               register={register("website", {
//                 pattern: {
//                   value: /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
//                   message: "Invalid URL"
//                 }
//               })}
//               error={errors.website}
//             />
//             <Select
//               label="Project Status"
//               options={["Active", "Completed"]}
//               register={register("status")}
//             />
//             <Input
//               label="Keywords"
//               register={register("keywords")}
//             />
//             <Input
//               label="Location / Country"
//               register={register("location")}
//             />
//             <Input
//               label="Documents (PDF)"
//               type="file"
//               multiple
//               register={register("documents")}
//             />
//           </div>
//         </section>
//         <div className="flex justify-end pt-4">
//           <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
//             Submit
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// }

// /* Input */

// function Input({ label, register, error, ...props }) {

//   return (
//     <div className="flex flex-col gap-1">

//       <label className="font-medium text-gray-700">{label}</label>

//       <input
//         {...register}
//         {...props}
//         className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
//       />

//       {error && (
//         <p className="text-red-500 text-sm">{error.message}</p>
//       )}

//     </div>
//   )
// }

// /* Textarea */

// function Textarea({ label, register }) {

//   return (
//     <div className="flex flex-col gap-1">

//       <label className="font-medium text-gray-700">{label}</label>

//       <textarea
//         {...register}
//         className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
//       />

//     </div>
//   )
// }

// /* Select */

// function Select({ label, options = [], register, error }) {

//   return (
//     <div className="flex flex-col gap-1">

//       <label className="font-medium text-gray-700">{label}</label>

//       <select
//         {...register}
//         className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
//       >

//         <option value="">Select {label}</option>

//         {options.map((opt) => (
//           <option key={opt} value={opt}>{opt}</option>
//         ))}

//       </select>

//       {error && (
//         <p className="text-red-500 text-sm">{error.message}</p>
//       )}

//     </div>
//   )
// }



import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const OtherCountryProjectAdminPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch Projects
  const { data: projects = [], refetch } = useQuery({
    queryKey: ["otherCountryProjects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/other-country-projects");
      return res.data;
    },
  });

  // 🔹 Form Hook
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  // Destructure watch for the fields you need
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (!isNaN(start) && !isNaN(end) && end >= start) {
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
        const durationStr = `${months} month${months > 1 ? "s" : ""}`;

        // Only set value if it's different to avoid infinite loop
        const currentDuration = watch("duration");
        if (currentDuration !== durationStr) {
          setValue("duration", durationStr);
        }
      } else {
        setValue("duration", "");
      }
    } else {
      setValue("duration", "");
    }
  }, [startDate, endDate, setValue, watch]);
  const mutation = useMutation({
    mutationFn: async (data) => {
      if (editingProject) {
        return axiosSecure.put(`/other-country-projects/${editingProject._id}`, data);
      } else {
        return axiosSecure.post("/other-country-projects", data);
      }
    },
    onSuccess: () => {
      Swal.fire(
        "Success!",
        editingProject ? "Project Updated" : "Project Added",
        "success"
      );
      setEditingProject(null);
      queryClient.invalidateQueries(["otherCountryProjects"]);
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  // 🔹 Load data into form when editing
  useEffect(() => {
    if (editingProject) reset(editingProject);
  }, [editingProject, reset]);

  const onSubmit = (data) => {
    if (!editingProject) delete data._id;
    mutation.mutate(data);
  };

  // 🔹 Search filter
  const filteredProjects = projects.filter((p) =>
    p.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">

      {/* ===== Form Section ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
          {editingProject ? "Update Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* ================= Basic Project Information ================= */}
          <section>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Basic Project Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Project Name *</label>
                <input
                  type="text"
                  {...register("projectName", { required: "Project Name required" })}
                  className="border rounded px-3 py-2"
                />
                {errors.projectName && <span className="text-red-500 text-sm">{errors.projectName.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Full Project Name</label>
                <input
                  type="text"
                  {...register("fullProjectName")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Description</label>
                <textarea
                  {...register("description")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Focus Area *</label>
                <input
                  type="text"
                  {...register("focusArea", { required: "Focus Area is required" })}
                  className="border rounded px-3 py-2"
                />
                {errors.focusArea && <span className="text-red-500 text-sm">{errors.focusArea.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Project Type</label>
                <input
                  type="text"
                  readOnly
                  value="Other Country"
                  {...register("projectType")}
                  className="border rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>
          </section>

          {/* ================= Funding Information ================= */}
          <section>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Funding Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Funding Program</label>
                <input
                  type="text"
                  {...register("fundingProgram")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Funding Organization</label>
                <input
                  type="text"
                  {...register("fundingOrganization")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Total Budget</label>
                <input
                  type="number"
                  {...register("totalBudget", {
                    min: { value: 1, message: "Budget must be positive" }
                  })}
                  className="border rounded px-3 py-2"
                />
                {errors.totalBudget && <span className="text-red-500 text-sm">{errors.totalBudget.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Grant Amount</label>
                <input
                  type="number"
                  {...register("grantAmount")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Funding Country</label>
                <input
                  type="text"
                  {...register("fundingCountry")}
                  className="border rounded px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* ================= Project Timeline ================= */}
          <section>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Project Timeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  {...register("startDate", { required: "Start date required" })}
                  className="border rounded px-3 py-2"
                />
                {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  {...register("endDate", { required: "End date required" })}
                  className="border rounded px-3 py-2"
                />
                {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Project Duration</label>
                <input
                  type="text"
                  readOnly
                  {...register("duration")}
                  className="border rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>
          </section>

          {/* ================= Team / Partners ================= */}
          <section>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Project Team / Partners
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Lead Institution</label>
                <input
                  type="text"
                  {...register("leadInstitution")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Partner Institutions</label>
                <textarea
                  {...register("partnerInstitutions")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Project Coordinator</label>
                <input
                  type="text"
                  {...register("coordinator")}
                  className="border rounded px-3 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Research Team Members</label>
                <textarea
                  {...register("teamMembers")}
                  className="border rounded px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* ================= Project Outcomes ================= */}
          <section>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Project Outcomes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Publications</label>
                <textarea {...register("publications")} className="border rounded px-3 py-2" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Research Outputs</label>
                <textarea {...register("outputs")} className="border rounded px-3 py-2" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Prototypes / Technology Developed</label>
                <textarea {...register("prototypes")} className="border rounded px-3 py-2" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Reports</label>
                <textarea {...register("reports")} className="border rounded px-3 py-2" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Datasets</label>
                <textarea {...register("datasets")} className="border rounded px-3 py-2" />
              </div>
            </div>
          </section>

          {/* ================= Extra Fields ================= */}
          <section>
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">
              Extra Fields
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Project Website</label>
                <input
                  type="url"
                  {...register("website", {
                    pattern: {
                      value: /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/,
                      message: "Invalid URL"
                    }
                  })}
                  className="border rounded px-3 py-2"
                />
                {errors.website && <span className="text-red-500 text-sm">{errors.website.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Project Status</label>
                <select {...register("status")} className="border rounded px-3 py-2">
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Keywords</label>
                <input type="text" {...register("keywords")} className="border rounded px-3 py-2" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Location / Country</label>
                <input type="text" {...register("location")} className="border rounded px-3 py-2" />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-1">Documents (PDF)</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setValue("documents", e.target.files)}
                  className="border rounded px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {editingProject ? "Update Project" : "Add Project"}
            </button>
          </div>
        </form>
      </div>

      {/* ===== Projects Cards ===== */}
      <div className='border-t border-gray-700 pt-6'>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">All Other Country Projects</h2>

        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by Project Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div key={proj._id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col border">
              <h3 className="text-xl font-bold">{proj.projectName}</h3>
              <p className="text-sm mb-2">Focus Area: {proj.focusArea || "N/A"}</p>
              <p className="text-sm mb-2">Lead Institution: {proj.leadInstitution || "N/A"}</p>

              <div className="flex gap-2 mt-auto pt-2">
                <button
                  onClick={() => setEditingProject(proj)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: "Are you sure?",
                      text: "This will delete the project!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    });
                    if (result.isConfirmed) {
                      await axiosSecure.delete(`/other-country-projects/${proj._id}`);
                      Swal.fire("Deleted!", "Project has been deleted.", "success");
                      refetch();
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OtherCountryProjectAdminPage;