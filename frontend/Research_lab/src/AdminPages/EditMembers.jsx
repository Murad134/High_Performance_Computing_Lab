
// import React, { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../hooks/useAxiosSecure";

// /* ================= Reusable Input ================= */
// const Input = ({ label, registerProps, type = "text" }) => (
//   <div className="flex flex-col gap-1">
//     <label className="text-sm font-semibold text-gray-700">{label}</label>
//     <input
//       type={type}
//       {...registerProps}
//       className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//     />
//   </div>
// );
// const AdminStudentProjectPage = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();
//   const formRef = useRef(null);

//   const { register, handleSubmit, reset, watch, setValue } = useForm({
//     shouldUnregister: false,
//     defaultValues: {
//       type: "project",
//       studentLevel: "BSc",
//     },
//   });

//   const type = watch("type");
//   const [editingId, setEditingId] = useState(null);
//   const [searchRoll, setSearchRoll] = useState("");

//   /* ================= GET DATA ================= */
//   const { data: projects = [], isLoading } = useQuery({
//     queryKey: ["studentProjects"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/studentProject");
//       return res.data;
//     },
//   });

//   /* ================= CREATE / UPDATE ================= */
//   const createMutation = useMutation({
//     mutationFn: async (payload) => {
//       if (editingId) {
//         const res = await axiosSecure.put(
//           `/studentProject/update/${editingId}`,
//           payload
//         );
//         return res.data;
//       } else {
//         const res = await axiosSecure.post("/studentProject/add", payload);
//         return res.data;
//       }
//     },
//     onSuccess: () => {
//       Swal.fire(
//         "Success",
//         editingId ? "Updated Successfully" : "Created Successfully",
//         "success"
//       );
//       queryClient.invalidateQueries({ queryKey: ["studentProjects"] });
//       resetForm();
//     },
//     onError: () => {
//       Swal.fire("Error", "Something went wrong", "error");
//     },
//   });

//   /* ================= SUBMIT ================= */

//   const onSubmit = (formData) => {
//     const payload = {
//       type: formData.type,
//       stdntstatus: "ongoing",
//       student: {
//         studentName: formData.studentName,
//         studentLevel: formData.studentLevel,
//         session: formData.session,
//         roll: formData.roll,
//         studentImage: studentImageUrl,
//         department: formData.department,
//       },
//       ...(formData.type === "project"
//         ? {
//           project: {
//             projectTitle: formData.projectTitle,
//             projectImage: formData.projectImage?.[0],
//             technologies: formData.technologies
//               ? formData.technologies.split(",").map(t => t.trim())
//               : [],
//             projectStartDate: formData.projectStartDate,
//             projectDetails: formData.projectDetails,
//             projectstatus: "ongoing",
//           },
//         }
//         : {
//           thesis: {
//             thesisTitle: formData.thesisTitle,
//             keywords: formData.keywords
//               ? formData.keywords.split(",").map(k => k.trim())
//               : [],
//             publicationDate: formData.publicationDate,
//             publication: formData.publication,
//             thesisStartDate: formData.thesisStartDate,
//             abstract: formData.abstract,
//             thesisstatus: "ongoing",
//           },
//         }),
//     };

//     createMutation.mutate(payload);
//   };

//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     // common fields
//     setValue("type", item.type);
//     setValue("studentName", item.student?.studentName);
//     setValue("studentLevel", item.student?.studentLevel);
//     setValue("session", item.student?.session);
//     setValue("roll", item.student?.roll);
//     setValue("studentImage", item.student?.studentImage?.[0]);
//     setValue("department", item.student?.department);

//     if (item.type === "project") {
//       setValue("projectTitle", item.project?.projectTitle);
//       setValue("projectImage", item.project?.projectImage?.[0]);
//       setValue(
//         "technologies",
//         item.project?.technologies?.join(", ")
//       );
//       setValue("projectStartDate", item.project?.projectStartDate);
//       setValue("projectDetails", item.project?.projectDetails);
//     }

//     if (item.type === "thesis") {
//       setValue("thesisTitle", item.thesis?.thesisTitle);
//       setValue(
//         "keywords",
//         item.thesis?.keywords?.join(", ")
//       );
//       setValue("publicationDate", item.thesis?.publicationDate);
//       setValue("publication", item.thesis?.publication);
//       setValue("thesisStartDate", item.thesis?.thesisStartDate);
//       setValue("abstract", item.thesis?.abstract);
//     }
//     setTimeout(() => {
//       formRef.current.scrollIntoView({
//         behavior: "smooth",
//       });
//     }, 100);
//   };
//   const handleCancel = () => {
//     resetForm();
//   };
//   const resetForm = () => {
//     reset({
//       // ✅ keep these
//       type: "project",
//       studentLevel: "BSc",

//       // ❌ clear student fields
//       studentName: "",
//       session: "",
//       roll: "",
//       studentImage: "",
//       department: "",

//       // ❌ clear project fields
//       projectTitle: "",
//       projectImage: "",
//       technologies: "",
//       projectStartDate: "",
//       projectDetails: "",

//       // ❌ clear thesis fields
//       thesisTitle: "",
//       keywords: "",
//       publicationDate: "",
//       publication: "",
//       thesisStartDate: "",
//       abstract: "",
//     });

//     setEditingId(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-10">
//       <h2 className="text-3xl font-bold text-center text-indigo-700">
//         {editingId ? "Edit Student Record" : "Add Student Project / Thesis"}
//       </h2>

//       <div ref={formRef}>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-white rounded-3xl p-8 space-y-8"
//         >
//           {/* ================= STUDENT HEADER ================= */}
//           <h3 className="text-2xl font-bold text-blue-600 border-b pb-2">
//             Student Information
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <Input label="Student Name" registerProps={register("studentName")} />
//             <Input label="Session" registerProps={register("session")} />
//             <Input label="Roll" registerProps={register("roll")} />
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-semibold text-gray-700">
//                 Student Image
//               </label>

//               <input
//                 type="file"
//                 accept="image/png, image/jpeg, image/jpg"
//                 {...register("studentImage")}
//                 className="border border-gray-300 rounded-lg px-3 py-2"
//               />
//             </div>
//             <Input label="Department" registerProps={register("department")} />
//             <div className="flex flex-col gap-1">
//               <label className="text-sm font-semibold text-gray-700">
//                 Student Level
//               </label>
//               <select
//                 {...register("studentLevel")}
//                 className="border rounded-lg px-3 py-2"
//               >
//                 <option>BSc</option>
//                 <option>MSc</option>
//                 <option>PhD</option>
//               </select>
//             </div>
//           </div>

//           {/* ================= TYPE HEADER ================= */}
//           <h3 className="text-2xl font-bold text-indigo-600 border-b pb-2">
//             Select Record Type
//           </h3>

//           <select
//             {...register("type")}
//             className="border rounded-lg p-3 w-full"
//           >
//             <option value="project">Project</option>
//             <option value="thesis">Thesis</option>
//           </select>

//           {/* ================= PROJECT HEADER ================= */}
//           {type === "project" && (
//             <>
//               <h3 className="text-2xl font-bold text-green-600 border-b pb-2">
//                 Project Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input
//                   label="Project Title"
//                   registerProps={register("projectTitle")}
//                 />
//                 <div className="flex flex-col gap-1">
//                   <label className="text-sm font-semibold text-gray-700">
//                     Project Image
//                   </label>

//                   <input
//                     type="file"
//                     accept="image/png, image/jpeg, image/jpg"
//                     {...register("projectImage")}
//                     className="border border-gray-300 rounded-lg px-3 py-2"
//                   />
//                 </div>
//                 <Input
//                   label="Technologies (comma separated)"
//                   registerProps={register("technologies")}
//                 />
//                 <Input
//                   type="date"
//                   label="Project Start Date"
//                   registerProps={register("projectStartDate")}
//                 />

//                 <div className="md:col-span-2 flex flex-col gap-1">
//                   <label className="text-sm font-semibold text-gray-700">
//                     Project Details
//                   </label>
//                   <textarea
//                     {...register("projectDetails")}
//                     className="border rounded-lg p-3"
//                   />
//                 </div>
//               </div>
//             </>
//           )}

//           {/* ================= THESIS HEADER ================= */}
//           {type === "thesis" && (
//             <>
//               <h3 className="text-2xl font-bold text-purple-600 border-b pb-2">
//                 Thesis Information
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input
//                   label="Thesis Title"
//                   registerProps={register("thesisTitle")}
//                 />
//                 <Input
//                   label="Keywords (comma separated)"
//                   registerProps={register("keywords")}
//                 />
//                 <Input
//                   type="date"
//                   label="Publication Date"
//                   registerProps={register("publicationDate")}
//                 />
//                 <Input
//                   label="Publication"
//                   registerProps={register("publication")}
//                 />
//                 <Input
//                   type="date"
//                   label="Thesis Start Date"
//                   registerProps={register("thesisStartDate")}
//                 />

//                 <div className="md:col-span-2 flex flex-col gap-1">
//                   <label className="text-sm font-semibold text-gray-700">
//                     Abstract
//                   </label>
//                   <textarea
//                     {...register("abstract")}
//                     className="border rounded-lg p-3"
//                   />
//                 </div>
//               </div>
//             </>
//           )}

//           {/* ================= BUTTON SECTION ================= */}
//           <div className="flex justify-end gap-4 pt-4">
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="px-6 py-3 bg-gray-400 text-white rounded-xl font-semibold hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             )}
//             <button
//               type="submit"
//               className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-900 transition"
//             >
//               {editingId ? "Update" : "Submit"}
//             </button>
//           </div>
//         </form>

//       </div>



//       {/* ================= DISPLAY SECTION ================= */}
//       <div className="mt-14 space-y-8 border-t-2 border-red-500 pt-10">

//         <h2 className="text-3xl font-bold text-center text-indigo-700 pb-4">
//           All Student Records
//         </h2>

//         {/* Search Bar */}
//         <div className="flex justify-center">
//           <input
//             type="text"
//             placeholder="Search by Roll Number..."
//             value={searchRoll}
//             onChange={(e) => setSearchRoll(e.target.value)}
//             className="w-full max-w-md border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         {isLoading && (
//           <p className="text-center text-gray-500 italic">
//             Loading records...
//           </p>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects
//             .filter((item) =>
//               searchRoll
//                 ? item.student?.roll?.toString().includes(searchRoll)
//                 : true
//             )
//             .map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white border rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
//               >

//                 {/* CARD HEADER */}
//                 <div className="space-y-2">
//                   <h3 className="text-xl font-bold text-gray-800">
//                     Name : {item.student?.studentName || "N/A"}
//                   </h3>

//                   <p className="text-gray-600 font-medium">
//                     Title : {item.type === "project"
//                       ? item.project?.projectTitle
//                       : item.thesis?.thesisTitle}
//                   </p>
//                 </div>

//                 {/* CARD BODY */}
//                 <div className="mt-2 space-y-2 text-sm">
//                   <p>
//                     <span className="font-semibold text-indigo-600">Roll:</span>{" "}
//                     {item.student?.roll}
//                   </p>
//                   <p>
//                     <span className="font-semibold text-indigo-600">Department:</span>{" "}
//                     {item.student?.department}
//                   </p>
//                   <p>
//                     <span className="font-semibold text-indigo-600">Session:</span>{" "}
//                     {item.student?.session}
//                   </p>
//                   <p>
//                     <span className="font-semibold text-indigo-600">Program:</span>{" "}
//                     {item.student?.studentLevel}
//                   </p>
//                 </div>

//                 {/* CARD FOOTER */}
//                 <div className="mt-4 flex justify-between items-center">

//                   <button
//                     onClick={() => handleEdit(item)}
//                     className="px-4 py-2 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition"
//                   >
//                     Edit
//                   </button>

//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${item.type === "project"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-green-100 text-green-700"
//                       }`}
//                   >
//                     {item.type?.toUpperCase()}
//                   </span>

//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminStudentProjectPage;




import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const IMGBB_KEY = import.meta.env.VITE_image_upload_key;

/* ================= Upload to imgbb ================= */
const uploadToImgbb = async (file) => {
  if (!file || typeof file === "string") return file; // already a URL string
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.data.url; // ✅ returns string URL
};

/* ================= Reusable Input ================= */
const Input = ({ label, registerProps, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      {...registerProps}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const AdminStudentProjectPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const formRef = useRef(null);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    shouldUnregister: false,
    defaultValues: {
      type: "project",
      studentLevel: "BSc",
    },
  });

  const type = watch("type");
  const [editingId, setEditingId] = useState(null);
  const [searchRoll, setSearchRoll] = useState("");

  // ✅ separate image states
  const [studentImageFile, setStudentImageFile] = useState(null);
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [studentImagePreview, setStudentImagePreview] = useState("");
  const [projectImagePreview, setProjectImagePreview] = useState("");

  /* ================= GET DATA ================= */
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["studentProjects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/studentProject");
      return res.data;
    },
  });

  /* ================= CREATE / UPDATE ================= */
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingId) {
        const res = await axiosSecure.put(
          `/studentProject/update/${editingId}`,
          payload
        );
        return res.data;
      } else {
        const res = await axiosSecure.post("/studentProject/add", payload);
        return res.data;
      }
    },
    onSuccess: () => {
      Swal.fire(
        "Success",
        editingId ? "Updated Successfully" : "Created Successfully",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["studentProjects"] });
      resetForm();
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  /* ================= SUBMIT ================= */
  const onSubmit = async (formData) => {
    try {
      // ✅ upload images first, get URL strings
      const studentImageUrl = studentImageFile
        ? await uploadToImgbb(studentImageFile)
        : studentImagePreview || "";

      const projectImageUrl = projectImageFile
        ? await uploadToImgbb(projectImageFile)
        : projectImagePreview || "";

      const payload = {
        type: formData.type,
        stdntstatus: "ongoing",
        status: "ongoing",
        student: {
          studentName: formData.studentName,
          studentLevel: formData.studentLevel,
          session: formData.session,
          roll: formData.roll,
          studentImage: studentImageUrl, // ✅ string URL
          department: formData.department,
        },
        ...(formData.type === "project"
          ? {
            project: {
              projectTitle: formData.projectTitle,
              projectImage: projectImageUrl, // ✅ string URL
              technologies: formData.technologies
                ? formData.technologies.split(",").map((t) => t.trim())
                : [],
              projectStartDate: formData.projectStartDate,
              projectDetails: formData.projectDetails,
              projectstatus: "ongoing",
            },
          }
          : {
            thesis: {
              thesisTitle: formData.thesisTitle,
              keywords: formData.keywords
                ? formData.keywords.split(",").map((k) => k.trim())
                : [],
              publicationDate: formData.publicationDate,
              publication: formData.publication,
              thesisStartDate: formData.thesisStartDate,
              abstract: formData.abstract,
              thesisstatus: "ongoing",
            },
          }),
      };

      createMutation.mutate(payload);
    } catch (err) {
      Swal.fire("Error", "Image upload failed. Try again.", "error", err);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditingId(item._id);
    setValue("type", item.type);
    setValue("studentName", item.student?.studentName);
    setValue("studentLevel", item.student?.studentLevel);
    setValue("session", item.student?.session);
    setValue("roll", item.student?.roll);
    setValue("department", item.student?.department);

    // ✅ set existing image URLs for preview
    setStudentImagePreview(item.student?.studentImage || "");
    setStudentImageFile(null);

    if (item.type === "project") {
      setValue("projectTitle", item.project?.projectTitle);
      setValue("technologies", item.project?.technologies?.join(", "));
      setValue("projectStartDate", item.project?.projectStartDate);
      setValue("projectDetails", item.project?.projectDetails);
      setProjectImagePreview(item.project?.projectImage || "");
      setProjectImageFile(null);
    }

    if (item.type === "thesis") {
      setValue("thesisTitle", item.thesis?.thesisTitle);
      setValue("keywords", item.thesis?.keywords?.join(", "));
      setValue("publicationDate", item.thesis?.publicationDate);
      setValue("publication", item.thesis?.publication);
      setValue("thesisStartDate", item.thesis?.thesisStartDate);
      setValue("abstract", item.thesis?.abstract);
    }

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCancel = () => resetForm();

  const resetForm = () => {
    reset({
      type: "project",
      studentLevel: "BSc",
      studentName: "",
      session: "",
      roll: "",
      department: "",
      projectTitle: "",
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
    // ✅ clear image states
    setStudentImageFile(null);
    setProjectImageFile(null);
    setStudentImagePreview("");
    setProjectImagePreview("");
    setEditingId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700">
        {editingId ? "Edit Student Record" : "Add Student Project / Thesis"}
      </h2>

      <div ref={formRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl p-8 space-y-8"
        >
          {/* ================= STUDENT INFO ================= */}
          <h3 className="text-2xl font-bold text-blue-600 border-b pb-2">
            Student Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Student Name" registerProps={register("studentName")} />
            <Input label="Session" registerProps={register("session")} />
            <Input label="Roll" registerProps={register("roll")} />

            {/* ✅ Student Image */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Student Image
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setStudentImageFile(file);
                  setStudentImagePreview(URL.createObjectURL(file));
                }}
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              {studentImagePreview && (
                <img
                  src={studentImagePreview}
                  alt="Student Preview"
                  className="mt-2 h-20 w-20 rounded-full object-cover border"
                />
              )}
            </div>

            <Input label="Department" registerProps={register("department")} />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">
                Student Level
              </label>
              <select
                {...register("studentLevel")}
                className="border rounded-lg px-3 py-2"
              >
                <option>BSc</option>
                <option>MSc</option>
                <option>PhD</option>
              </select>
            </div>
          </div>

          {/* ================= TYPE ================= */}
          <h3 className="text-2xl font-bold text-indigo-600 border-b pb-2">
            Select Record Type
          </h3>
          <select
            {...register("type")}
            className="border rounded-lg p-3 w-full"
          >
            <option value="project">Project</option>
            <option value="thesis">Thesis</option>
          </select>

          {/* ================= PROJECT INFO ================= */}
          {type === "project" && (
            <>
              <h3 className="text-2xl font-bold text-green-600 border-b pb-2">
                Project Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Project Title" registerProps={register("projectTitle")} />

                {/* ✅ Project Image */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setProjectImageFile(file);
                      setProjectImagePreview(URL.createObjectURL(file));
                    }}
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {projectImagePreview && (
                    <img
                      src={projectImagePreview}
                      alt="Project Preview"
                      className="mt-2 h-20 w-32 rounded-lg object-cover border"
                    />
                  )}
                </div>

                <Input
                  label="Technologies (comma separated)"
                  registerProps={register("technologies")}
                />
                <Input
                  type="date"
                  label="Project Start Date"
                  registerProps={register("projectStartDate")}
                />
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Project Details
                  </label>
                  <textarea
                    {...register("projectDetails")}
                    className="border rounded-lg p-3"
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= THESIS INFO ================= */}
          {type === "thesis" && (
            <>
              <h3 className="text-2xl font-bold text-purple-600 border-b pb-2">
                Thesis Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Thesis Title" registerProps={register("thesisTitle")} />
                <Input label="Keywords (comma separated)" registerProps={register("keywords")} />
                <Input type="date" label="Publication Date" registerProps={register("publicationDate")} />
                <Input label="Publication" registerProps={register("publication")} />
                <Input type="date" label="Thesis Start Date" registerProps={register("thesisStartDate")} />
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Abstract</label>
                  <textarea
                    {...register("abstract")}
                    className="border rounded-lg p-3"
                  />
                </div>
              </div>
            </>
          )}

          {/* ================= BUTTONS ================= */}
          <div className="flex justify-end gap-4 pt-4">
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
      </div>

      {/* ================= DISPLAY SECTION ================= */}
      <div className="mt-14 space-y-8 border-t-2 border-red-500 pt-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 pb-4">
          All Student Records
        </h2>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by Roll Number..."
            value={searchRoll}
            onChange={(e) => setSearchRoll(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="bg-white border rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800">
                    Name: {item.student?.studentName || "N/A"}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    Title:{" "}
                    {item.type === "project"
                      ? item.project?.projectTitle
                      : item.thesis?.thesisTitle}
                  </p>
                </div>
                <div className="mt-2 space-y-2 text-sm">
                  <p><span className="font-semibold text-indigo-600">Roll:</span> {item.student?.roll}</p>
                  <p><span className="font-semibold text-indigo-600">Department:</span> {item.student?.department}</p>
                  <p><span className="font-semibold text-indigo-600">Session:</span> {item.student?.session}</p>
                  <p><span className="font-semibold text-indigo-600">Program:</span> {item.student?.studentLevel}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${item.type === "project"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                      }`}
                  >
                    {item.type?.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentProjectPage;