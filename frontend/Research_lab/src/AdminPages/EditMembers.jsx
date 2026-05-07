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
      const res = await axiosSecure.get("/studentproject");
      return res.data;
    },
  });

  /* ================= CREATE / UPDATE ================= */
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      if (editingId) {
        const res = await axiosSecure.put(
          `/studentproject/update/${editingId}`,
          payload
        );
        return res.data;
      } else {
        const res = await axiosSecure.post("/studentproject/add", payload);
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
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* <h2 className="text-3xl font-bold text-center text-blue-700 flex items-center justify-center gap-3">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        {editingId ? "Edit Student Record" : "Add Student Project / Thesis"}
      </h2> */}

      <div ref={formRef} className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-xl rounded-3xl p-8">
          {/* Header with Icon */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              {editingId ? "Edit Student Record" : "Add Student Project / Thesis"}
            </h2>
            <p className="text-blue-600 font-medium">Manage student projects and thesis records</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ================= STUDENT INFO ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Student Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Student Name</label>
                <input
                  type="text"
                  {...register("studentName")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter student name"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Session</label>
                <input
                  type="text"
                  {...register("session")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter session"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Roll</label>
                <input
                  type="text"
                  {...register("roll")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter roll number"
                />
              </div>

              {/* ✅ Student Image */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Student Image</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setStudentImageFile(file);
                    setStudentImagePreview(URL.createObjectURL(file));
                  }}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {studentImagePreview && (
                  <img
                    src={studentImagePreview}
                    alt="Student Preview"
                    className="mt-2 h-20 w-20 rounded-full object-cover border-2 border-blue-200 shadow-md"
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Department</label>
                <input
                  type="text"
                  {...register("department")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter department"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Student Level</label>
                <div className="relative">
                  <select
                    {...register("studentLevel")}
                    className="w-full appearance-none rounded-xl border-2 border-blue-200 bg-white px-4 py-3 pr-10 font-medium text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="BSc">BSc</option>
                    <option value="MSc">MSc</option>
                    <option value="PhD">PhD</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
                <p className="text-xs text-blue-600">Used to group the member under BSc, MSc, or PhD views.</p>
              </div>
            </div>
          </div>

          {/* ================= TYPE ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Select Record Type</h3>
            </div>

            <div className="relative">
              <select
                {...register("type")}
                className="w-full appearance-none rounded-xl border-2 border-blue-200 bg-white px-4 py-3 pr-10 font-medium text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="project">Project</option>
                <option value="thesis">Thesis</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* ================= PROJECT INFO ================= */}
          {type === "project" && (
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800">Project Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Project Title</label>
                  <input
                    type="text"
                    {...register("projectTitle")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                    placeholder="Enter project title"
                  />
                </div>

                {/* ✅ Project Image */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Project Image</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setProjectImageFile(file);
                      setProjectImagePreview(URL.createObjectURL(file));
                    }}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {projectImagePreview && (
                    <img
                      src={projectImagePreview}
                      alt="Project Preview"
                      className="mt-2 h-20 w-32 rounded-lg object-cover border-2 border-blue-200 shadow-md"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Technologies (comma separated)</label>
                  <input
                    type="text"
                    {...register("technologies")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Project Start Date</label>
                  <input
                    type="date"
                    {...register("projectStartDate")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Project Details</label>
                  <textarea
                    {...register("projectDetails")}
                    rows="4"
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 resize-vertical"
                    placeholder="Enter project details..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= THESIS INFO ================= */}
          {type === "thesis" && (
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-800">Thesis Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Thesis Title</label>
                  <input
                    type="text"
                    {...register("thesisTitle")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                    placeholder="Enter thesis title"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Keywords (comma separated)</label>
                  <input
                    type="text"
                    {...register("keywords")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                    placeholder="Machine Learning, AI, Data Science"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Publication Date</label>
                  <input
                    type="date"
                    {...register("publicationDate")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Publication</label>
                  <input
                    type="text"
                    {...register("publication")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                    placeholder="Journal/Conference name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Thesis Start Date</label>
                  <input
                    type="date"
                    {...register("thesisStartDate")}
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Abstract</label>
                  <textarea
                    {...register("abstract")}
                    rows="4"
                    className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 resize-vertical"
                    placeholder="Enter thesis abstract..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= BUTTONS ================= */}
          <div className="flex justify-center gap-4 pt-6">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {editingId ? "Update Record" : "Add Record"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-14 space-y-8 border-t-2 border-teal-500 pt-10">
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
                className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[450px] flex flex-col"
              >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 border-b-2 border-teal-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold truncate">
                          {item.student?.studentName || "N/A"}
                        </h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                          item.type === "project"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {item.type?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Section */}
                <div className="flex-1 p-4 space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-teal-700 mb-1">Title</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {item.type === "project"
                        ? item.project?.projectTitle
                        : item.thesis?.thesisTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-semibold text-teal-600">Roll:</span>
                      <p className="text-gray-700">{item.student?.roll}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-teal-600">Session:</span>
                      <p className="text-gray-700">{item.student?.session}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-teal-600">Department:</span>
                      <p className="text-gray-700">{item.student?.department}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-teal-600">Program:</span>
                      <p className="text-gray-700">{item.student?.studentLevel}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="bg-gradient-to-r from-teal-100 to-white p-4 border-t-2 border-teal-200">
                  <button
                    onClick={() => handleEdit(item)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                  >
                    Edit Record
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentProjectPage;