import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminDepartmentPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Fetch departments
  const { data: departments = [], refetch } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/departments");
      return res.data;
    },
  });

  // 🔹 Form hook
  const { register, handleSubmit, reset } = useForm();

  // 🔹 Mutation for add/update
  const mutation = useMutation({
    mutationFn: async (data) => {
      if (editingDepartment) {
        const { _id, ...payload } = data; // remove _id to prevent Mongo error
        return await axiosSecure.put(`/departments/${editingDepartment._id}`, payload);
      } else {
        return await axiosSecure.post("/departments", data);
      }
    },
    onSuccess: () => {
      Swal.fire(
        "Success!",
        editingDepartment ? "Department Updated" : "Department Added",
        "success"
      );
      setEditingDepartment(null);
      reset();
      queryClient.invalidateQueries(["departments"]);
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
    if (editingDepartment) {
      reset(editingDepartment);
    }
  }, [editingDepartment, reset]);

  const onSubmit = (data) => {
    // ✅ Remove _id for new departments
    if (!editingDepartment) {
      delete data._id;
    }

    mutation.mutate(data);
  };

  // 🔹 Filter departments based on search
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">

      {/* ===== Form Section ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
          {editingDepartment ? "Update Department" : "Add New Department"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Basic Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Department No *</label>
                <input {...register("departmentNo", { required: true })} placeholder="Department No" className="border p-3 rounded w-full" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Department Name *</label>
                <input {...register("name", { required: true })} placeholder="Department Name" className="border p-3 rounded w-full" />
              </div>
            </div>
          </div>

          {/* Head Info */}
          {/* <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Head Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Head Name</label>
                <input {...register("headName")} placeholder="Head Name" className="border p-3 rounded w-full" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Head Portfolio Link</label>
                <input {...register("headPortfolio")} placeholder="Portfolio Link" className="border p-3 rounded w-full" />
              </div>
            </div>
          </div> */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Head Information
            </h3>

            <div className="grid md:grid-cols-3 gap-2">

              <div>
                <label className="block mb-1 font-medium text-gray-700">Head Name</label>
                <input
                  {...register("headName")}
                  placeholder="Head Name"
                  className="border p-3 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Head Portfolio Link
                </label>
                <input
                  {...register("headPortfolio")}
                  placeholder="Portfolio Link"
                  className="border p-3 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">Head Email</label>
                <input
                  type="email"
                  {...register("headEmail")}
                  placeholder="Head Email"
                  className="border p-3 rounded w-full"
                />
              </div>

            </div>
          </div>

          {/* Additional Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Additional Details</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Keywords (comma separated)</label>
              <input {...register("keywords")} placeholder="Keyword1, Keyword2" className="border p-3 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Statement / Presentation</label>
              <textarea {...register("statement")} placeholder="Write statement here" rows={3} className="border p-3 rounded w-full" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Documents</label>
                <textarea {...register("documents")} placeholder="Documents info" rows={1} className="border p-3 rounded w-full" />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Starting Year</label>
                <input type="number" {...register("startingYear")} placeholder="Starting Year" className="border p-3 rounded w-full" />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {editingDepartment ? "Update Department" : "Add Department"}
            </button>
          </div>
        </form>
      </div>
      {/* ===== Cards Section ===== */}
      <div className='border-t border-gray-700 pt-6'>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">All Departments Records </h2>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by Department Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 pt-6">
          {filteredDepartments.map((dept) => (
            <div
              key={dept._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden border"
            >
              {/* ===== Card Header ===== */}
              <div className=" p-5">
                <h3 className="text-xl font-bold">
                  {dept.name}
                </h3>
                <p className="text-sm">
                  Dept No: {dept.departmentNo || "N/A"}
                </p>
              </div>

              {/* ===== Card Body ===== */}
              <div className="p-5 flex-1 space-y-3 border-t border-gray-200">
                <div className="flex gap-2">
                  <span className="font-medium">Dept. Head : </span>
                  <span>{dept.headName || "N/A"}</span>
                </div>

                <div className="flex pb-2">
                  <span className="font-medium">Starting Year : </span>
                  <span className="text-sm px-2 py-1 rounded-lg">
                    {dept.startingYear || "N/A"}
                  </span>
                </div>

                <div>
                  <p className="font-medium mb-1 border-t border-gray-200 p-2">Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {dept.keywords
                      ? dept.keywords.split(",").map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                        >
                          {keyword.trim()}
                        </span>
                      ))
                      : <span className="text-sm text-gray-400">N/A</span>}
                  </div>
                </div>
              </div>

              {/* ===== Card Footer ===== */}
              <div className="bg-gray-50 p-4 flex justify-between">
                <button
                  onClick={() => setEditingDepartment(dept)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Edit
                </button>

                <button
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: "Are you sure?",
                      text: "This will delete the department!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    });

                    if (result.isConfirmed) {
                      await axiosSecure.delete(`/departments/${dept._id}`);
                      Swal.fire("Deleted!", "Department has been deleted.", "success");
                      refetch();
                    }
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
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

export default AdminDepartmentPage;