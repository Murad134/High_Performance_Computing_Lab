// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../hooks/useAxios";

// /* ================= Reusable Input Component ================= */
// const Input = ({ label, registerProps, type = "text" }) => (
//   <div className="flex flex-col gap-1">
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     <input
//       type={type}
//       {...registerProps}
//       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// );

// const AdminStudentProjectPage = () => {
//   const axiosSecure = useAxios();
//   const queryClient = useQueryClient();
//   const { register, handleSubmit, reset, watch, setValue } = useForm();
//   const [editingId, setEditingId] = useState(null); // track editing record
//   const [searchRoll, setSearchRoll] = useState(""); // for search input
//   const type = watch("type") || "project";

//   /* ================= GET ALL DATA ================= */
//   const { data: projects = [], isLoading } = useQuery({
//     queryKey: ["studentProjects"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/studentProject");
//       return res.data;
//     },
//   });

//   /* ================= CREATE / UPDATE MUTATION ================= */
//   const createMutation = useMutation({
//     mutationFn: async (newData) => {
//       if (editingId) {
//         // Update mode
//         const res = await axiosSecure.put(`/studentProject/update/${editingId}`, newData);
//         return res.data;
//       } else {
//         // Create mode
//         const res = await axiosSecure.post("/studentProject/add", {
//           ...newData,
//           status: 'ongoing',
//         });
//         return res.data;
//       }
//     },
//     onSuccess: (data) => {
//       Swal.fire({
//         icon: "success",
//         title: editingId ? "Updated Successfully!" : "Created Successfully!",
//         text: editingId ? data.message || "Record updated." : `Inserted ID: ${data.insertedId || "N/A"}`,
//       });
//       queryClient.invalidateQueries(["studentProjects"]);
//       reset();
//       setEditingId(null);
//     },
//     onError: () => {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Something went wrong!",
//       });
//     },
//   });

//   /* ================= FORM SUBMIT ================= */
//   const onSubmit = (formData) => {
//     const payload = {
//       type: formData.type,
//       student: {
//         studentName: formData.studentName,
//         studentLevel: formData.studentLevel,
//         session: formData.session,
//         roll: formData.roll,
//         studentImage: formData.studentImage,
//         department: formData.department,
//       },
//       ...(formData.type === "project"
//         ? {
//           projectTitle: formData.projectTitle,
//           projectImage: formData.projectImage,
//           technologies: formData.technologies
//             ? formData.technologies.split(",").map((t) => t.trim())
//             : [],
//           projectStartDate: formData.projectStartDate,
//           projectDetails: formData.projectDetails,
//         }
//         : {
//           thesisTitle: formData.thesisTitle,
//           keywords: formData.keywords
//             ? formData.keywords.split(",").map((k) => k.trim())
//             : [],
//           publicationDate: formData.publicationDate,
//           publication: formData.publication,
//           thesisStartDate: formData.thesisStartDate,
//           abstract: formData.abstract,
//         }),
//     };
//     createMutation.mutate(payload);
//   };

//   /* ================= LOAD DATA TO FORM FOR EDIT ================= */
//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     setValue("type", item.type);
//     setValue("studentName", item.student?.studentName || "");
//     setValue("studentLevel", item.student?.studentLevel || "");
//     setValue("session", item.student?.session || "");
//     setValue("roll", item.student?.roll || "");
//     setValue("studentImage", item.student?.studentImage || "");
//     setValue("department", item.student?.department || "");

//     if (item.type === "project") {
//       setValue("projectTitle", item.projectTitle || "");
//       setValue("projectImage", item.projectImage || "");
//       setValue("technologies", item.technologies?.join(", ") || "");
//       setValue("projectStartDate", item.projectStartDate || "");
//       setValue("projectDetails", item.projectDetails || "");
//     } else {
//       setValue("thesisTitle", item.thesisTitle || "");
//       setValue("keywords", item.keywords?.join(", ") || "");
//       setValue("publicationDate", item.publicationDate || "");
//       setValue("publication", item.publication || "");
//       setValue("thesisStartDate", item.thesisStartDate || "");
//       setValue("abstract", item.abstract || "");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-8 text-center">
//           {editingId ? "Edit Student Project / Thesis" : "Student Project / Thesis Form"}
//         </h2>

//         {/* ================= FORM ================= */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Student Section */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4 border-b pb-2">Student Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input label="Student Name" registerProps={register("studentName")} />
//               <div className="flex flex-col gap-1">
//                 <label className="text-sm font-medium">Student Level</label>
//                 <select {...register("studentLevel")} className="border border-gray-300 rounded-lg px-3 py-2">
//                   <option value="BSc">BSc</option>
//                   <option value="MSc">MSc</option>
//                   <option value="PhD">PhD</option>
//                 </select>
//               </div>
//               <Input label="Session" registerProps={register("session")} />
//               <Input label="Roll" registerProps={register("roll")} />
//               <Input label="Student Image URL" registerProps={register("studentImage")} />
//               <Input label="Department" registerProps={register("department")} />
//             </div>
//           </div>

//           {/* Type Selector */}
//           <div>
//             <label className="text-sm font-medium">Select Type</label>
//             <select {...register("type")} className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1">
//               <option value="project">Project</option>
//               <option value="thesis">Thesis</option>
//             </select>
//           </div>

//           {/* Project / Thesis Section */}
//           {type === "project" && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4 border-b pb-2">Project Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input label="Project Title" registerProps={register("projectTitle")} />
//                 <Input label="Project Image URL" registerProps={register("projectImage")} />
//                 <Input label="Technologies (comma separated)" registerProps={register("technologies")} />
//                 <Input label="Start Date" type="date" registerProps={register("projectStartDate")} />
//                 <div className="col-span-2">
//                   <h4 className="text-lg font-medium mb-1">Project Details</h4>
//                   <textarea
//                     placeholder="Project Details"
//                     {...register("projectDetails")}
//                     className="w-full border border-gray-300 rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {type === "thesis" && (
//             <div>
//               <h3 className="text-xl font-semibold mb-4 border-b pb-2">Thesis Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Input label="Thesis Title" registerProps={register("thesisTitle")} />
//                 <Input label="Keywords (comma separated)" registerProps={register("keywords")} />
//                 <Input label="Publication Date" type="date" registerProps={register("publicationDate")} />
//                 <Input label="Publication" registerProps={register("publication")} />
//                 <Input label="Start Date" type="date" registerProps={register("thesisStartDate")} />
//                 <div className="col-span-2">
//                   <h4 className="text-lg font-medium mb-1">Thesis Abstract</h4>
//                   <textarea
//                     placeholder="Thesis Abstract"
//                     {...register("abstract")}
//                     className="w-full border border-gray-300 rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-900 transition"
//             >
//               {editingId ? "Update" : "Submit"}
//             </button>
//           </div>
//         </form>

//         {/* ================= Display Cards ================= */}
//         <div className="mt-10 border-t-2 border-red-500 pt-10">
//           <h3 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 tracking-tight">
//             All Student Records
//           </h3>

//           {/* Search Bar */}
//           <div className="flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search by Roll Number..."
//               value={searchRoll}
//               onChange={(e) => setSearchRoll(e.target.value)}
//               className="w-full max-w-md border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           {isLoading && <p className="text-center text-gray-500 italic">Loading records...</p>}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {projects
//               .filter((item) =>
//                 searchRoll ? item.student?.roll?.toString().includes(searchRoll) : true
//               )
//               .map((item) => (
//                 <div
//                   key={item._id}
//                   className="bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
//                 >
//                   {/* Card Header */}
//                   <div className="mb-4">
//                     <h4 className="text-xl font-bold text-gray-800 truncate">
//                       Student Name: {item.student?.studentName || "N/A"}
//                     </h4>
//                     <p className="text-gray-600 mt-1 font-medium">
//                       Title:{" "}
//                       {item.type === "project"
//                         ? item.projectTitle || "No Project Title"
//                         : item.thesisTitle || "No Thesis Title"}
//                     </p>
//                   </div>

//                   {/* Card Body */}
//                   <div className="space-y-2">
//                     <p className="text-gray-700">
//                       <span className="font-medium text-indigo-600">Roll:</span>{" "}
//                       {item.student?.roll || "N/A"}
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-medium text-indigo-600">Department:</span>{" "}
//                       {item.student?.department || "N/A"}
//                     </p>
//                     <p className="text-gray-700">
//                       <span className="font-medium text-indigo-600">Session:</span>{" "}
//                       {item.student?.session || "N/A"}
//                     </p>
//                   </div>

//                   {/* Card Footer */}
//                   <div className="mt-6 flex justify-between items-center">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="px-5 py-2 bg-yellow-500 text-white rounded-xl font-semibold shadow hover:bg-yellow-600 hover:shadow-lg transition-all duration-200"
//                     >
//                       Edit
//                     </button>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-semibold ${item.type === "project"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-green-100 text-green-700"
//                         }`}
//                     >
//                       {item.type?.toUpperCase() || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStudentProjectPage;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

/* ================= Reusable Input Component ================= */
const Input = ({ label, registerProps, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...registerProps}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const AdminStudentProjectPage = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    // ✅ FIX 1: Prevents fields from unregistering when hidden (fixes studentImage & department lost on thesis)
    shouldUnregister: false,
    // ✅ FIX 2: Proper default values so selects are stable from first render
    defaultValues: {
      type: "project",
      studentLevel: "BSc",
    },
  });

  const [editingId, setEditingId] = useState(null);
  const [searchRoll, setSearchRoll] = useState("");
  const type = watch("type");

  /* ================= GET ALL DATA ================= */
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["studentProjects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/studentProject");
      return res.data;
    },
  });

  /* ================= CREATE / UPDATE MUTATION ================= */
  const createMutation = useMutation({
    mutationFn: async (newData) => {
      if (editingId) {
        const res = await axiosSecure.put(`/studentProject/update/${editingId}`, newData);
        return res.data;
      } else {
        const res = await axiosSecure.post("/studentProject/add", {
          ...newData,
          status: "ongoing",
        });
        return res.data;
      }
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: editingId ? "Updated Successfully!" : "Created Successfully!",
        text: editingId
          ? data.message || "Record updated."
          : `Inserted ID: ${data.insertedId || "N/A"}`,
      });
      // ✅ FIX 3: Correct invalidateQueries syntax for React Query v5
      queryClient.invalidateQueries({ queryKey: ["studentProjects"] });
      reset({
        type: "project",
        studentLevel: "BSc",
        studentName: "",        
        session: "",            
        roll: "",               
        studentImage: "",       
        department: "",         
        projectTitle: "",
        projectImage: "",
        technologies: "",
        projectStartDate: "",
        projectDetails: "",
        thesisTitle: "",
        keywords: "",
        publicationDate: "",
        publication: "",
        thesisStartDate: "",
        abstract: "",
      });
      setEditingId(null);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong!",
      });
    },
  });

  /* ================= FORM SUBMIT ================= */
  const onSubmit = (formData) => {
    const payload = {
      type: formData.type,
      student: {
        studentName: formData.studentName,
        studentLevel: formData.studentLevel,
        session: formData.session,
        roll: formData.roll,
        studentImage: formData.studentImage,
        department: formData.department,
      },
      ...(formData.type === "project"
        ? {
          projectTitle: formData.projectTitle,
          projectImage: formData.projectImage,
          // ✅ FIX 4: filter(Boolean) prevents [""] when field is empty
          technologies: formData.technologies
            ? formData.technologies.split(",").map((t) => t.trim()).filter(Boolean)
            : [],
          projectStartDate: formData.projectStartDate,
          projectDetails: formData.projectDetails,
        }
        : {
          thesisTitle: formData.thesisTitle,
          keywords: formData.keywords
            ? formData.keywords.split(",").map((k) => k.trim()).filter(Boolean)
            : [],
          publicationDate: formData.publicationDate,
          publication: formData.publication,
          thesisStartDate: formData.thesisStartDate,
          abstract: formData.abstract,
        }),
    };
    createMutation.mutate(payload);
  };

  /* ================= LOAD DATA TO FORM FOR EDIT ================= */
  const handleEdit = (item) => {
    setEditingId(item._id);
    setValue("type", item.type);
    setValue("studentName", item.student?.studentName || "");
    setValue("studentLevel", item.student?.studentLevel || "BSc");
    setValue("session", item.student?.session || "");
    setValue("roll", item.student?.roll || "");
    setValue("studentImage", item.student?.studentImage || "");
    setValue("department", item.student?.department || "");

    if (item.type === "project") {
      setValue("projectTitle", item.projectTitle || "");
      setValue("projectImage", item.projectImage || "");
      setValue("technologies", item.technologies?.join(", ") || "");
      setValue("projectStartDate", item.projectStartDate || "");
      setValue("projectDetails", item.projectDetails || "");
    } else {
      setValue("thesisTitle", item.thesisTitle || "");
      setValue("keywords", item.keywords?.join(", ") || "");
      setValue("publicationDate", item.publicationDate || "");
      setValue("publication", item.publication || "");
      setValue("thesisStartDate", item.thesisStartDate || "");
      setValue("abstract", item.abstract || "");
    }

    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= CANCEL EDIT ================= */
  const handleCancel = () => {
    reset({ type: "project", studentLevel: "BSc" });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {editingId ? "Edit Student Project / Thesis" : "Student Project / Thesis Form"}
        </h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Student Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Student Name" registerProps={register("studentName")} />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Student Level</label>
                <select
                  {...register("studentLevel")}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="BSc">BSc</option>
                  <option value="MSc">MSc</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <Input label="Session" registerProps={register("session")} />
              <Input label="Roll" registerProps={register("roll")} />
              <Input label="Student Image URL" registerProps={register("studentImage")} />
              <Input label="Department" registerProps={register("department")} />
            </div>
          </div>

          {/* Type Selector */}
          <div>
            <label className="text-sm font-medium">Select Type</label>
            <select
              {...register("type")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            >
              <option value="project">Project</option>
              <option value="thesis">Thesis</option>
            </select>
          </div>

          {/* Project Section */}
          {type === "project" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Project Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Project Title" registerProps={register("projectTitle")} />
                <Input label="Project Image URL" registerProps={register("projectImage")} />
                <Input
                  label="Technologies (comma separated)"
                  registerProps={register("technologies")}
                />
                <Input
                  label="Start Date"
                  type="date"
                  registerProps={register("projectStartDate")}
                />
                <div className="col-span-2">
                  <h4 className="text-lg font-medium mb-1">Project Details</h4>
                  <textarea
                    placeholder="Project Details"
                    {...register("projectDetails")}
                    className="w-full border border-gray-300 rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Thesis Section */}
          {type === "thesis" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 border-b pb-2">Thesis Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Thesis Title" registerProps={register("thesisTitle")} />
                <Input
                  label="Keywords (comma separated)"
                  registerProps={register("keywords")}
                />
                <Input
                  label="Publication Date"
                  type="date"
                  registerProps={register("publicationDate")}
                />
                <Input label="Publication" registerProps={register("publication")} />
                <Input
                  label="Start Date"
                  type="date"
                  registerProps={register("thesisStartDate")}
                />
                <div className="col-span-2">
                  <h4 className="text-lg font-medium mb-1">Thesis Abstract</h4>
                  <textarea
                    placeholder="Thesis Abstract"
                    {...register("abstract")}
                    className="w-full border border-gray-300 rounded-xl p-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit / Cancel Buttons */}
          <div className="flex justify-end gap-3">
            {/* ✅ FIX 5: Cancel button to exit edit mode */}
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-400 text-white rounded-xl font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-900 transition"
            >
              {editingId ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        {/* ================= Display Cards ================= */}
        <div className="mt-10 border-t-2 border-red-500 pt-10">
          <h3 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 tracking-tight">
            All Student Records
          </h3>

          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <input
              type="text"
              placeholder="Search by Roll Number..."
              value={searchRoll}
              onChange={(e) => setSearchRoll(e.target.value)}
              className="w-full max-w-md border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {isLoading && (
            <p className="text-center text-gray-500 italic">Loading records...</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((item) =>
                searchRoll
                  ? item.student?.roll?.toString().includes(searchRoll)
                  : true
              )
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  {/* Card Header */}
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-800 truncate">
                      Name: {item.student?.studentName || "N/A"}
                    </h4>
                    <p className="text-gray-600 mt-1 font-medium">
                      Title:{" "}
                      {item.type === "project"
                        ? item.projectTitle || "No Project Title"
                        : item.thesisTitle || "No Thesis Title"}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-medium text-indigo-600">Roll:</span>{" "}
                      {item.student?.roll || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium text-indigo-600">Department:</span>{" "}
                      {item.student?.department || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium text-indigo-600">Session:</span>{" "}
                      {item.student?.session || "N/A"}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 flex justify-between items-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-5 py-2 bg-yellow-500 text-white rounded-xl font-semibold shadow hover:bg-yellow-600 hover:shadow-lg transition-all duration-200"
                    >
                      Edit
                    </button>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${item.type === "project"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {item.type?.toUpperCase() || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentProjectPage;