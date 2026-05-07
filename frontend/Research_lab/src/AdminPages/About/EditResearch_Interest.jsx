import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminResearchInterest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // ---------------- Fetch AboutProf Data ----------------
  const { data: aboutprof, isLoading, isError } = useQuery({
    queryKey: ["aboutprof"],
    queryFn: async () => (await axiosSecure.get("/aboutprof")).data,
  });

  // ---------------- Add Interest Mutation ----------------
  const addMutation = useMutation({
    mutationFn: (data) => axiosSecure.put("/aboutprof/add-interest", data),
    onSuccess: () => {
      Swal.fire("Added!", "Research Interest Added Successfully", "success");
      queryClient.invalidateQueries(["aboutprof"]);
      reset();
    },
    onError: () => Swal.fire("Error!", "Failed to Add Interest", "error"),
  });

  // ---------------- Delete Interest Mutation ----------------
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/aboutprof/interest/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Interest Removed Successfully", "success");
      queryClient.invalidateQueries(["aboutprof"]);
    },
    onError: () => Swal.fire("Error!", "Failed to Delete Interest", "error"),
  });

  // ---------------- Update Interest Mutation ----------------
  const updateMutation = useMutation({
    mutationFn: ({ id, title }) =>
      axiosSecure.put(`/aboutprof/interest/${id}`, { title }),
    onSuccess: () => {
      Swal.fire("Updated!", "Research Interest Updated Successfully", "success");
      queryClient.invalidateQueries(["aboutprof"]);
      setEditingId(null);
      setEditingTitle("");
    },
    onError: () => Swal.fire("Error!", "Failed to Update Interest", "error"),
  });

  // ---------------- Submit Handler ----------------
  const onSubmit = (data) => {
    if (!data.title?.trim()) {
      Swal.fire("Warning!", "Research Interest cannot be empty", "warning");
      return;
    }
    addMutation.mutate({ title: data.title.trim() });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load data.</p>;

  return (
    <div className=" mx-auto p-6  rounded-xl">
      {/* ---------- Page Header ---------- */}
      <h1 className="text-3xl font-semibold text-indigo-700 mb-2 text-center">
        Research Interests
      </h1>
      <p className="text-gray-500 mb-6 text-center">
        Add, view, update, and delete research interests for professors.
      </p>

      {/* ---------- Add Interest Form ---------- */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Research Interest"
          {...register("title", { required: true })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={addMutation.isLoading}
          className={`bg-indigo-600 text-white px-5 py-2 rounded-lg transition ${
            addMutation.isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-700"
          }`}
        >
          {addMutation.isLoading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* ---------- Existing Interests ---------- */}
      <div className="space-y-2">
        {(!aboutprof?.researchInterests || aboutprof.researchInterests.length === 0) && (
          <p className="text-gray-400">No research interests added yet.</p>
        )}

        {Array.isArray(aboutprof?.researchInterests) &&
          aboutprof.researchInterests.map((item, idx) => (
            <div
              key={item._id?.toString() || idx}
              className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg"
            >
              {editingId === item._id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded"
                />
              ) : (
                <span className="text-gray-800">{idx + 1}. {item.title}</span>
              )}

              <div className="flex gap-2">
                {editingId === item._id ? (
                  <button
                    onClick={() => {
                      if (!editingTitle.trim()) {
                        Swal.fire("Warning!", "Title cannot be empty", "warning");
                        return;
                      }
                      updateMutation.mutate({ id: item._id, title: editingTitle });
                    }}
                    disabled={updateMutation.isLoading}
                    className={`bg-green-600 text-white px-3 py-1 rounded-lg transition ${
                      updateMutation.isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                    }`}
                  >
                    {updateMutation.isLoading ? "Updating..." : "Update"}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(item._id);
                      setEditingTitle(item.title);
                    }}
                    className="bg-blue-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      text: `Delete "${item.title}"?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                      if (result.isConfirmed) deleteMutation.mutate(item._id);
                    });
                  }}
                  disabled={deleteMutation.isLoading}
                  className={`text-red-500 font-semibold transition ${
                    deleteMutation.isLoading ? "opacity-50 cursor-not-allowed" : "hover:text-red-700"
                  }`}
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminResearchInterest;