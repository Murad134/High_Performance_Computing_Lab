import React, { useState } from "react";
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

  const onSubmit = (data) => mutation.mutate(data);

  // ---------------- EDIT ----------------
  const handleEdit = (conf) => {
    const normalizedAuthors = Array.isArray(conf.authors) && conf.authors.length > 0
      ? conf.authors.map((a) => (typeof a === "string" ? { name: a } : { name: a?.name || "" }))
      : [{ name: "" }];

    const normalizedKeywords = Array.isArray(conf.keywords) && conf.keywords.length > 0
      ? conf.keywords
      : [""];

    reset({
      title: conf.title || "",
      conferenceName: conf.conferenceName || conf.publicationName || conf.journalName || "",
      conferenceVolume: conf.conferenceVolume || conf.volume || "",
      issue: conf.issue || "",
      pp: conf.pp || conf.pages || "",
      publicationName: conf.publicationName || conf.journalName || "",
      publicationUrl: conf.publicationUrl || conf.articleUrl || conf.link || "",
      yearOfPublication: conf.yearOfPublication || conf.year || "",
      keywords: normalizedKeywords,
      authors: normalizedAuthors,
      publisher: conf.publisher || "",
    });
    setEditId(conf.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <section className="max-w-6xl mx-auto p-6">
      {/* Form Section */}
      <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center">
        {editId ? "Edit Conference" : "Add Conference"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-5">
        {/* Basic Info */}
        <SectionTitle title="Basic Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Title" {...register("title", { required: true })} />
          <Input label="Conference Name" {...register("conferenceName")} />
          <Input label="Conference Volume" {...register("conferenceVolume")} />
          <Input label="Issue" {...register("issue")} />
          <Input label="pp" {...register("pp")} />
          <Input label="Publication Name" {...register("publicationName")} />
          <Input label="Publication URL" {...register("publicationUrl")} />
          <Input type="number" label="Year of Publication" {...register("yearOfPublication")} />
          <Input label="Publishers" {...register("publisher")} />
        </div>

        {/* Keywords */}
        <SectionTitle title="Keywords" />
        {keywordsField.fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center mb-2">
            <Input {...register(`keywords.${index}`)} placeholder={`Keyword ${index + 1}`} />
            <button type="button" className="text-red-500 text-sm" onClick={() => keywordsField.remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <AddButton text="+ Add Keyword" onClick={() => keywordsField.append("")} />

        {/* Authors */}
        <SectionTitle title="Authors" />
        {authorsField.fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center mb-2">
            <Input {...register(`authors.${index}.name`)} placeholder={`Author ${index + 1}`} />
            <button type="button" className="text-red-500 text-sm" onClick={() => authorsField.remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <AddButton text="+ Add Author" onClick={() => authorsField.append({ name: "" })} />

        {/* Submit */}
        <div className="flex justify-end pt-6">
          <button type="submit" className="bg-indigo-600 text-white px-8 py-2 rounded-lg">
            {editId ? "Update Conference" : "Save Conference"}
          </button>
        </div>
      </form>

      {/* Existing Conferences */}
      <section className="border-t py-6 border-red-500">
        <h3 className="text-center text-2xl font-bold text-indigo-700 mb-10">All Conferences Record</h3>

        {/* Search */}
        <div className="flex justify-center mb-6 gap-2">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
        </div>

        {/* Conference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredConferences.map((conf) => (
            <div key={conf.id} className="border p-4 rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold">Title: {conf.title}</h4>
                <p className="text-gray-700">Conference: {conf.conferenceName || conf.publicationName || "-"}</p>
                <p className="text-gray-700">Publication: {conf.publicationName || "-"}</p>
                <p className="text-gray-700">Volume: {conf.conferenceVolume || "-"}</p>
                <p className="text-gray-600 text-sm">Publisher: {conf.publisher || "-"}</p>
                <p className="text-gray-600 text-sm">Year: {conf.yearOfPublication || "-"}</p>
              </div>
              <div className="flex gap-2 mt-4 justify-end">
                <button className="bg-yellow-400 text-white px-3 py-1 rounded text-sm" onClick={() => handleEdit(conf)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm" onClick={() => handleDelete(conf.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

/* Reusable Components */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-semibold">{label}</label>}
      <input className="border p-3 rounded-lg w-full" {...props} />
    </div>
  );
}

function SectionTitle({ title }) {
  return <h3 className="text-lg font-bold text-indigo-600 pt-4">{title}</h3>;
}

function AddButton({ onClick, text = "+ Add More" }) {
  return (
    <button type="button" onClick={onClick} className="text-blue-600 text-sm mb-2">
      {text}
    </button>
  );
}