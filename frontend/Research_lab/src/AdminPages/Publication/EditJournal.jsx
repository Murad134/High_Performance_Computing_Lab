import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
const AdminArticleFormSections = () => {

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      authors: [{ name: "", affiliation: "", authorOrder: 1 }],
      keywords: [""],
      indexedIn: [""],
      correspondingAuthor: "",
      journalName: "",
      publisher: "",
      issn: "",
      volume: "",
      issue: "",
      pages: "",
      month: "",
      year: "",
      impactFactor: "",
      doi: "",
      articleUrl: "",
      pdfUrl: "",
      abstract: "",
    },
  });

  const { fields: authorFields, append: appendAuthor, remove: removeAuthor } = useFieldArray({
    control,
    name: "authors",
  });

  const { fields: keywordFields, append: appendKeyword, remove: removeKeyword } = useFieldArray({
    control,
    name: "keywords",
  });

  const { fields: indexedFields, append: appendIndexed, remove: removeIndexed } = useFieldArray({
    control,
    name: "indexedIn",
  });

  // ---------------- GET API ----------------
  const { data: journals = [], isLoading } = useQuery({
    queryKey: ["journals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/journals");
      return res.data;
    },
  });

  // ---------------- POST/UPDATE API ----------------
  const mutation = useMutation({
    mutationFn: async (data) => {
      if (editingId) {
        return await axiosSecure.put(`/journals/${editingId}`, data);
      }
      return await axiosSecure.post("/journals", data);
    },
    onSuccess: () => {
      Swal.fire("Success", `Journal ${editingId ? "updated" : "added"} successfully!`, "success");
      queryClient.invalidateQueries(["journals"]);
      reset();
      setEditingId(null);
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  // ---------------- DELETE API ----------------
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/journals/${id}`);
        Swal.fire("Deleted!", "Journal has been deleted.", "success");
        queryClient.invalidateQueries(["journals"]);
      } catch (err) {
        Swal.fire("Error", err.message || "Failed to delete", "error");
      }
    }
  };

  // ---------------- EDIT API ----------------
  const handleEdit = (journal) => {
    setEditingId(journal._id);
    Object.keys(journal).forEach((key) => {
      setValue(key, journal[key]);
    });
  };

  if (isLoading) return <p>Loading journals...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* <h2 className="text-3xl font-bold text-center text-blue-700 flex items-center justify-center gap-3">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {editingId ? "Edit Journal Article" : "Add Journal Article"}
      </h2> */}

      <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-xl rounded-3xl p-8">
        {/* Header with Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            {editingId ? "Edit Journal Article" : "Add Journal Article"}
          </h2>
          <p className="text-blue-600 font-medium">Manage journal publication records</p>
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
          <div className="space-y-6">

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Title *</label>
              <input
                {...register("title")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter article title"
                required
              />
            </div>

            {/* Authors */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700">Authors</label>
              <div className="space-y-3">
                {authorFields.map((author, index) => (
                  <div key={author.id} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-4">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Author Name</label>
                        <input
                          {...register(`authors.${index}.name`)}
                          className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-sm"
                          placeholder="Author name"
                        />
                      </div>
                      <div className="col-span-5">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Affiliation</label>
                        <input
                          {...register(`authors.${index}.affiliation`)}
                          className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-sm"
                          placeholder="Institution/Organization"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Order</label>
                        <input
                          type="number"
                          {...register(`authors.${index}.authorOrder`)}
                          className="w-full border-2 border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 text-sm"
                          placeholder="1"
                        />
                      </div>
                      <div className="col-span-1">
                        {authorFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAuthor(index)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg px-2 py-2 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                            title="Remove author"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendAuthor({ name: "", affiliation: "", authorOrder: authorFields.length + 1 })}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Author
                </button>
              </div>
            </div>

            {/* Corresponding Author + Journal Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Corresponding Author</label>
                <input
                  {...register("correspondingAuthor")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter corresponding author"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Journal Name</label>
                <input
                  {...register("journalName")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter journal name"
                />
              </div>
            </div>

            {/* Publisher + ISSN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Publisher</label>
                <input
                  {...register("publisher")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter publisher"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">ISSN</label>
                <input
                  {...register("issn")}
                  className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter ISSN"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====================== 2. Publication Details ====================== */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Publication Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Volume</label>
              <input
                {...register("volume")}
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
              <label className="text-sm font-semibold text-gray-700">Pages</label>
              <input
                {...register("pages")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="e.g., 123-145"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Month</label>
              <input
                {...register("month")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="e.g., January"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Year</label>
              <input
                type="number"
                {...register("year")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="2024"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Impact Factor</label>
              <input
                type="number"
                step="any"
                {...register("impactFactor")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="e.g., 2.5"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">DOI</label>
              <input
                {...register("doi")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="Enter DOI"
              />
            </div>
          </div>
        </div>

        {/* ====================== 3. Links & Files ====================== */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Links & Files</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Article URL</label>
              <input
                {...register("articleUrl")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="https://example.com/article"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">PDF URL</label>
              <input
                {...register("pdfUrl")}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                placeholder="https://example.com/article.pdf"
              />
            </div>
          </div>
        </div>

        {/* ====================== 4. Keywords & IndexedIn ====================== */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Keywords & Indexed In</h3>
          </div>
          <div className="space-y-6">
            {/* Keywords */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700">Keywords</label>
              <div className="space-y-3">
                {keywordFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center">
                    <input
                      {...register(`keywords.${index}`)}
                      className="flex-1 border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                      placeholder="Enter keyword"
                    />
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
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
                  onClick={() => appendKeyword("")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Keyword
                </button>
              </div>
            </div>

            {/* IndexedIn */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700">Indexed In</label>
              <div className="space-y-3">
                {indexedFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center">
                    <input
                      {...register(`indexedIn.${index}`)}
                      className="flex-1 border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                      placeholder="Enter indexed database"
                    />
                    <button
                      type="button"
                      onClick={() => removeIndexed(index)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-3 py-3 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                      title="Remove indexed database"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendIndexed("")}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold py-2 px-4 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Indexed Database
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ====================== 5. Abstract ====================== */}
        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800">Abstract</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Abstract</label>
              <textarea
                {...register("abstract")}
                rows={4}
                className="border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 resize-none"
                placeholder="Enter article abstract"
              ></textarea>
            </div>
          </div>
        </div>

        {/* ====================== Submit Button ====================== */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {editingId ? "Update Journal Article" : "Submit Journal Article"}
          </button>
        </div>
      </form>
      <div className="border-t-2 border-blue-200 mt-12 pt-12">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-8 flex items-center justify-center gap-3">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          All Journal Records
        </h3>
        {/* ================= Search Section ================= */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full border-2 border-blue-200 rounded-full px-6 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 pl-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-blue-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.filter((journal) =>
            journal.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
            .map((journal) => (
              <div
                key={journal._id}
                className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden min-h-[350px] flex flex-col"
              >
                {/* ================= Header ================= */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-5 border-b-2 border-blue-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xl leading-tight text-white mb-2 break-words">Title: {journal.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                          Journal Article
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================= Body ================= */}
                <div className="p-6 flex-1 bg-gradient-to-b from-white to-blue-50/30">
                  <div className="space-y-4">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-blue-700 text-sm block mb-1">Journal Name</span>
                          <p className="text-gray-800 font-medium break-words">{journal.journalName || "Not specified"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-blue-700 text-sm block mb-1">Publisher</span>
                          <p className="text-gray-800 font-medium break-words">{journal.publisher || "Not specified"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          </div>
                          <div>
                            <span className="font-semibold text-blue-700 text-sm block">Year</span>
                            <p className="text-gray-800 font-medium">{journal.year || "N/A"}</p>
                          </div>
                        </div>
                      </div>

                  
                    </div>
                  </div>
                </div>

                {/* ================= Footer ================= */}
                <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-5 border-t-2 border-blue-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-transparent"></div>
                  <div className="relative z-10 space-y-4">
                    {journal.articleUrl && (
                      <a
                        href={journal.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold py-3 px-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                      >
                        <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                        </div>
                        <span>View Full Article</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </a>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(journal)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold py-3 px-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                      >
                        <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                          </svg>
                        </div>
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(journal._id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold py-3 px-4 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                      >
                        <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </div>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminArticleFormSections;
