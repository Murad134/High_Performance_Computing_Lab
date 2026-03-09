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
      year: "",
      doi: "",
      articleUrl: "",
      pdfUrl: "",
      abstract: "",
      citationCount: 0,
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
    <div className="mx-auto px-10 py-6 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Journal Article</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* ====================== 1. Basic Info ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Basic Info</h3>
          <div className="space-y-4">

            {/* Title */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Title *</label>
              <input
                {...register("title")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Authors */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Authors</label>
              <div className="space-y-2">
                {authorFields.map((author, index) => (
                  <div key={author.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                      <input
                        {...register(`authors.${index}.name`)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="col-span-5">
                      <input
                        {...register(`authors.${index}.affiliation`)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        {...register(`authors.${index}.authorOrder`)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="col-span-1">
                      {authorFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAuthor(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendAuthor({ name: "", affiliation: "", authorOrder: authorFields.length + 1 })}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                >
                  + Add Author
                </button>
              </div>
            </div>

            {/* Corresponding Author + Journal Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Corresponding Author</label>
                <input
                  {...register("correspondingAuthor")}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Journal Name</label>
                <input
                  {...register("journalName")}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Publisher + ISSN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Publisher</label>
                <input
                  {...register("publisher")}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">ISSN</label>
                <input
                  {...register("issn")}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====================== 2. Publication Details ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Publication Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Volume</label>
              <input
                {...register("volume")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Issue</label>
              <input
                {...register("issue")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Pages</label>
              <input
                {...register("pages")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Year</label>
              <input
                type="number"
                {...register("year")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1 font-medium">DOI</label>
              <input
                {...register("doi")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        {/* ====================== 3. Links & Files ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Links & Files</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Article URL</label>
              <input
                {...register("articleUrl")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">PDF URL</label>
              <input
                {...register("pdfUrl")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        {/* ====================== 4. Keywords & IndexedIn ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Keywords & Indexed In</h3>
          <div className="space-y-4">
            {/* Keywords */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Keywords</label>
              <div className="space-y-2">
                {keywordFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      {...register(`keywords.${index}`)}
                      className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendKeyword("")}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                >
                  + Add Keyword
                </button>
              </div>
            </div>

            {/* IndexedIn */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Indexed In</label>
              <div className="space-y-2">
                {indexedFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <input
                      {...register(`indexedIn.${index}`)}
                      className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeIndexed(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendIndexed("")}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                >
                  + Add Indexed In
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ====================== 5. Abstract & Citation ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Abstract & Citation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Abstract</label>
              <textarea
                {...register("abstract")}
                rows={3}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Citation Count</label>
              <input
                type="number"
                {...register("citationCount")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        {/* ====================== Submit Button ====================== */}
        <div className="flex justify-end pt-3">
          <section>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 px-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingId ? "Update Journal" : "Submit Article"}
            </button>
          </section>
        </div>
      </form>
      <div className="border-t border-red-500 mt-10 pt-10">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 text-center pb-10">All Journals Records </h3>
        {/* ================= Search Section ================= */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full md:w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.filter((journal) =>
            journal.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
            .map((journal) => (
              <div
                key={journal._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                {/* ================= Header ================= */}
                <div className="mb-3">
                  <h4 className="font-bold text-lg">Title : {journal.title}</h4>
                </div>

                {/* ================= Body ================= */}
                <div className="flex-1 text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Journal Name:</strong> {journal.journalName || "-"}
                  </p>
                  <p>
                    <strong>Publisher:</strong> {journal.publisher || "-"}
                  </p>
                </div>

                {/* ================= Footer ================= */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                  <a
                    href={journal.articleUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    Article URL
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(journal)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(journal._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminArticleFormSections;
