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

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-slide-in-up {
            animation: slideInUp 0.6s ease-out forwards;
          }
          .animate-pulse-gentle {
            animation: pulse 2s ease-in-out infinite;
          }
        `
      }} />

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
      {/* ===== Premium Cards Section ===== */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400 to-teal-500 rounded-full blur-2xl"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Department Records
            </h2>
            <p className="text-gray-600 font-medium">Manage and organize your research departments</p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search departments by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-teal-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 transition-all duration-300 text-gray-700 placeholder-gray-400 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-teal-400 hover:text-teal-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredDepartments.map((dept, index) => (
              <div
                key={dept._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-teal-50 overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slide-in-up flex flex-col min-h-[500px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-white to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* ===== CARD HEADER ===== */}
                <div className="relative p-6 border-b border-teal-100/30 bg-gradient-to-r from-teal-50/20 to-blue-50/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700 border border-teal-200">
                        Dept #{dept.departmentNo || "N/A"}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300 mb-2 line-clamp-2">
                    {dept.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Est. {dept.startingYear || "N/A"}
                  </div>
                </div>

                {/* ===== CARD BODY ===== */}
                <div className="relative flex-1 p-6 space-y-4 bg-white">
                  {/* Department Head */}
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100/50">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Department Head</p>
                      <p className="text-sm text-gray-600 truncate">{dept.headName || "Not assigned"}</p>
                      {dept.headEmail && (
                        <p className="text-xs text-teal-600 mt-1 truncate">{dept.headEmail}</p>
                      )}
                    </div>
                  </div>

                  {/* Keywords Section */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">Research Keywords</span>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[40px]">
                      {dept.keywords ? (
                        dept.keywords.split(",").slice(0, 3).map((keyword, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 border border-teal-200 hover:from-teal-200 hover:to-blue-200 transition-all duration-200"
                          >
                            {keyword.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-400 italic">No keywords defined</span>
                      )}
                      {dept.keywords && dept.keywords.split(",").length > 3 && (
                        <span className="text-xs text-teal-600 font-medium">
                          +{dept.keywords.split(",").length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Statement Preview */}
                  {dept.statement && (
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-600 line-clamp-2 italic">
                        "{dept.statement.length > 100 ? `${dept.statement.substring(0, 100)}...` : dept.statement}"
                      </p>
                    </div>
                  )}
                </div>

                {/* ===== CARD FOOTER ===== */}
                <div className="relative px-6 pb-6 border-t border-teal-100/30 bg-gradient-to-r from-gray-50/50 to-teal-50/30">
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setEditingDepartment(dept)}
                      className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 group/btn"
                    >
                      <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Delete Department?",
                          text: `Are you sure you want to delete "${dept.name}"? This action cannot be undone.`,
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#ef4444",
                          cancelButtonColor: "#6b7280",
                          confirmButtonText: "Yes, Delete",
                          cancelButtonText: "Cancel",
                          customClass: {
                            popup: 'animate-slide-in-up'
                          }
                        });

                        if (result.isConfirmed) {
                          await axiosSecure.delete(`/departments/${dept._id}`);
                          Swal.fire({
                            title: "Deleted!",
                            text: "Department has been deleted successfully.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                            customClass: {
                              popup: 'animate-pulse-gentle'
                            }
                          });
                          refetch();
                        }
                      }}
                      className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDepartments.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {searchTerm ? "No departments found" : "No departments yet"}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? `No departments match "${searchTerm}"` : "Start by adding your first department above"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default AdminDepartmentPage;