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
      guests: [{ name: "", title: "", affiliation: "", country: "", role: "" }],
      sponsors: [""],
      photos: [],
      dates: { start_date: "", end_date: "" },
      venue: { building: "", room: "", city: "", country: "" },
      registration: { fee: "", deadline: "" },
      contact: { email: "", phone: "", website: "" },
      related_journal: "",
      published_proceedings: false
    },
  });

  const guestsField = useFieldArray({ control, name: "guests" });
  const sponsorsField = useFieldArray({ control, name: "sponsors" });
  const photosField = useFieldArray({ control, name: "photos" });

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
    // Convert MongoDB _id to id for React form
    reset(conf);
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
          <Input label="Conference Title" {...register("title", { required: true })} />
          <Input label="Theme" {...register("theme")} />
          <Input label="Conference Type" {...register("conference_type")} />
          <Input label="Organizer Professor" {...register("organizer_professor")} />
          <Input label="Organizing Department" {...register("organizing_department")} />
          <Input label="University Name" {...register("university_name")} />
        </div>

        {/* Dates */}
        <SectionTitle title="Conference Dates" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="date" label="Start Date" {...register("dates.start_date")} />
          <Input type="date" label="End Date" {...register("dates.end_date")} />
        </div>

        {/* Venue */}
        <SectionTitle title="Venue" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Building" {...register("venue.building")} />
          <Input label="Room" {...register("venue.room")} />
          <Input label="City" {...register("venue.city")} />
          <Input label="Country" {...register("venue.country")} />
        </div>

        {/* Guests */}
        <SectionTitle title="Guests" />
        {guestsField.fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded mb-2">
            <Input placeholder="Name" {...register(`guests.${index}.name`)} />
            <Input placeholder="Title" {...register(`guests.${index}.title`)} />
            <Input placeholder="Affiliation" {...register(`guests.${index}.affiliation`)} />
            <Input placeholder="Country" {...register(`guests.${index}.country`)} />
            <Input placeholder="Role" {...register(`guests.${index}.role`)} />
            <button type="button" onClick={() => guestsField.remove(index)} className="text-red-500 text-sm self-end">
              Remove
            </button>
          </div>
        ))}
        <AddButton onClick={() => guestsField.append({})} />

        {/* Sponsors */}
        <SectionTitle title="Sponsors" />
        {sponsorsField.fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center mb-2">
            <Input {...register(`sponsors.${index}`)} placeholder={`Sponsor ${index + 1}`} />
            <button type="button" className="text-red-500 text-sm" onClick={() => sponsorsField.remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <AddButton onClick={() => sponsorsField.append("")} />

        {/* Photos */}
        <SectionTitle title="Photos" />
        {photosField.fields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center mb-2">
            <Input placeholder={`Photo URL ${index + 1}`} {...register(`photos.${index}`)} />
            <button type="button" className="text-red-500 text-sm" onClick={() => photosField.remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <AddButton onClick={() => photosField.append("")} />

        {/* Proceedings */}
        <SectionTitle title="Proceedings" />
        <Input label="Related Journal" {...register("related_journal")} />
        <label className="flex gap-2 items-center">
          <input type="checkbox" {...register("published_proceedings")} />
          Published Proceedings
        </label>

        {/* Registration */}
        <SectionTitle title="Registration" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="number" label="Registration Fee" {...register("registration.fee")} />
          <Input type="date" label="Registration Deadline" {...register("registration.deadline")} />
        </div>

        {/* Contact */}
        <SectionTitle title="Contact Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email" type="email" {...register("contact.email")} />
          <Input label="Phone" type="tel" {...register("contact.phone")} />
          <Input label="Website" {...register("contact.website")} />
        </div>

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
                <p className="text-gray-700">Theme: {conf.theme}</p>
                <p className="text-gray-600 text-sm">University: {conf.university_name}</p>
                <p className="text-gray-600 text-sm">Department: {conf.organizing_department}</p>
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

function AddButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="text-blue-600 text-sm mb-2">
      + Add More
    </button>
  );
}