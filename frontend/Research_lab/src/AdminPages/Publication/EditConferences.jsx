import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminAddConferenceForm() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      conferenceName: "",
      conferenceVolume: "",
      issue: "",
      pp: "",
      publicationName: "",
      publicationUrl: "",
      yearOfPublication: "",
      keywords: [""],
      authors: [{ name: "" }],
      publisher: "",
    },
  });

  const keywordsField = useFieldArray({ control, name: "keywords" });
  const authorsField = useFieldArray({ control, name: "authors" });

  // Ensure form updates when editId changes
  useEffect(() => {
    if (!editId) {
      reset({
        title: "",
        conferenceName: "",
        conferenceVolume: "",
        issue: "",
        pp: "",
        publicationName: "",
        publicationUrl: "",
        yearOfPublication: "",
        keywords: [""],
        authors: [{ name: "" }],
        publisher: "",
      });
    }
  }, [editId, reset]);

  // ---------------- GET API ----------------
  const { data: conferences = [], isLoading } = useQuery({
    queryKey: ["conferences"],
    queryFn: async () => {
      const res = await axiosSecure.get("/conferences");
      // Map MongoDB _id to id for frontend
      return res.data.map(c => ({ ...c, id: c._id }));
    },
  });

  // ---------------- CREATE / UPDATE ----------------
  const mutation = useMutation({
    mutationFn: (data) => {
      if (editId) return axiosSecure.put(`/conferences/${editId}`, data);
      return axiosSecure.post("/conferences", data);
    },
    onSuccess: () => {
      Swal.fire(
        "Success",
        `Conference ${editId ? "Updated" : "Added"} Successfully`,
        "success"
      );
      reset();
      setEditId(null);
      queryClient.invalidateQueries(["conferences"]);
    },
    onError: (err) => Swal.fire("Error", err.message, "error"),
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      keywords: Array.isArray(data.keywords)
        ? data.keywords.map((k) => String(k || "").trim()).filter(Boolean)
        : [],
      authors: Array.isArray(data.authors)
        ? data.authors
            .map((a) => ({ name: String(a?.name || "").trim() }))
            .filter((a) => a.name)
        : [],
    };

    mutation.mutate(payload);
  };
  // ---------------- EDIT ----------------
  const handleEdit = (conf) => {
    const normalizedAuthors = Array.isArray(conf.authors) && conf.authors.length > 0
      ? conf.authors.map((a) => (typeof a === "string" ? { name: a } : { name: a?.name || "" }))
      : [{ name: "" }];

    const normalizedKeywords = Array.isArray(conf.keywords) && conf.keywords.length > 0
      ? conf.keywords
      : [""];

    // Reset the entire form with all data
    reset({
      title: conf.title || "",
      conferenceName: conf.conferenceName || conf.publicationName || conf.journalName || "",
      conferenceVolume: conf.conferenceVolume || conf.volume || "",
      issue: conf.issue || "",
      pp: conf.pp || conf.pages || "",
      publicationName: conf.publicationName || conf.journalName || "",
      publicationUrl: conf.publicationUrl || conf.articleUrl || conf.link || "",
      yearOfPublication: conf.yearOfPublication || conf.year || "",
      publisher: conf.publisher || "",
      keywords: normalizedKeywords,
      authors: normalizedAuthors,
    });

    setEditId(conf.id);

    // Scroll to top with a small delay to ensure form has updated
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };  
  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the conference!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/conferences/${id}`);
        Swal.fire("Deleted!", "Conference has been deleted.", "success");
        queryClient.invalidateQueries(["conferences"]);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };
  if (isLoading) return <p>Loading conferences...</p>;
  // ---------------- FILTERED CONFERENCES ----------------
  const filteredConferences = conferences.filter((conf) =>
    conf.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-xl rounded-3xl p-8">
        {/* Header with Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            {editId ? "Edit Conference" : "Add Conference"}
          </h2>
          <p className="text-blue-600 font-medium">Manage conference publication records</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ====================== 1. Basic Info ====================== */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Basic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Title *</label>
              <input
                {...register("title", { required: true })}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter conference title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Conference Name</label>
              <input
                {...register("conferenceName")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter conference name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Conference Volume</label>
              <input
                {...register("conferenceVolume")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter volume"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Issue</label>
              <input
                {...register("issue")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter issue"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Pages (pp)</label>
              <input
                {...register("pp")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="e.g., 123-145"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Publication Name</label>
              <input
                {...register("publicationName")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter publication name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Publication URL</label>
              <input
                {...register("publicationUrl")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="https://example.com/publication"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Year of Publication</label>
              <input
                type="number"
                {...register("yearOfPublication")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="2024"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Publisher</label>
              <input
                {...register("publisher")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter publisher"
              />
            </div>
          </div>
        </div>

        {/* ====================== 2. Keywords ====================== */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Keywords</h3>
          </div>
          <div className="space-y-4">
            {keywordsField.fields.map((item, index) => (
              <div key={item.id} className="flex gap-3 items-center">
                <input
                  {...register(`keywords.${index}`)}
                  className="flex-1 border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder={`Keyword ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => keywordsField.remove(index)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-3 py-3 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                  title="Remove keyword"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => keywordsField.append("")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Keyword
            </button>
          </div>
        </div>

        {/* ====================== 3. Authors ====================== */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Authors</h3>
          </div>
          <div className="space-y-4">
            {authorsField.fields.map((item, index) => (
              <div key={item.id} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    {...register(`authors.${index}.name`)}
                    className="flex-1 border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-sm"
                    placeholder={`Author ${index + 1} name`}
                  />
                  <button
                    type="button"
                    onClick={() => authorsField.remove(index)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-2 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                    title="Remove author"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => authorsField.append({ name: "" })}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Author
            </button>
          </div>
        </div>

        {/* ====================== Submit Button ====================== */}
        <div className="flex justify-center pt-6 pb-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {editId ? "Update Conference" : "Submit Conference"}
          </button>
        </div>
      </form>

      {/* Existing Conferences */}
      <form className="border-t py-6 border-red-500">
        <h3 className="text-center text-2xl font-bold text-indigo-700 mb-10">All Conferences Record</h3>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Search Conferences</h3>
          </div>
          <input
            type="text"
            placeholder="Search by Title, Conference Name, or Publication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
          />
        </div>

        {/* Conference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredConferences.map((conf) => (
            <div key={conf.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col min-h-[500px]">
              {/* Header - Fixed Height */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white line-clamp-2">{conf.title}</h4>
                </div>
              </div>

              {/* Body - Flexible Height */}
              <div className="p-4 space-y-3 flex-1 flex flex-col">
                {/* Conference Info */}
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm font-semibold text-blue-800">Conference Name</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{conf.conferenceName || conf.publicationName || "N/A"}</p>
                </div>

                {/* Publication Info */}
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-sm font-semibold text-blue-800">Publication Name </span>
                  </div>
                  {conf.publicationName && <p className="text-sm text-gray-700 font-medium">{conf.publicationName}</p>}
                </div>

                {/* Authors */}
                {conf.authors && conf.authors.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-blue-800">Authors</span>
                    </div>
                    <p className="text-xs text-gray-700">{conf.authors.map(author => author.name).join(", ")}</p>
                  </div>
                )}

                {/* Keywords */}
                {conf.keywords && conf.keywords.length > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-sm font-semibold text-blue-800">Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {conf.keywords.slice(0, 3).map((keyword, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                      {conf.keywords.length > 3 && (
                        <span className="text-xs text-gray-500">+{conf.keywords.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Spacer to push footer to bottom */}
                <div className="flex-1"></div>
              </div>

              {/* Footer - Fixed Height */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex-shrink-0">
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-2 px-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
                    onClick={() => handleEdit(conf)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center gap-2"
                    onClick={() => handleDelete(conf.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
      </div>
    </div>
  );
}