import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUserRole from "../../hooks/useUserRole";

export default function StudentCard({ item }) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role } = useUserRole();
  const statusMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/studentproject/${id}/status`, {
        stdntstatus: "completed",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studentProjects"]);
      Swal.fire({
        icon: "success",
        title: "Moved to Alumni!",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to update status",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/studentproject/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["studentProjects"]);
      Swal.fire({
        icon: "success",
        title: "Student Deleted!",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to delete student",
      });
    },
  });

  return (

    <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">

      {/* ========= Header: Student Image ========= */}
      <header className="card-header">
        <figure className="w-full h-48 overflow-hidden">
          <img
            src={item.student?.studentImage}
            alt={item.student?.studentName}
            className="w-full h-full object-cover p-2 rounded-xl"
          />
        </figure>
      </header>

      {/* ========= Body: Name, Roll, Session, Department ========= */}
      <div className="card-body p-4 border-t border-base-900">
        {/* Name */}
        <h2 className="card-title text-lg font-semibold  mb-1 flex items-center justify-between">
          Name : {item.student?.studentName}
          {item.stdntstatus === "completed" && (
            <span className="badge badge-secondary ml-2">Alumni</span>
          )}
        </h2>

        {/* Student Info: each field on its own line */}
        <div className="text-sm space-y-1">
          <p><span className="font-medium">Roll:</span> {item.student?.roll}</p>
          <p><span className="font-medium">Session:</span> {item.student?.session}</p>
          <p><span className="font-medium">Department:</span> {item.student?.department}</p>
        </div>
      </div>

      {/* ========= Footer: Title + Buttons ========= */}
      <footer className="card-footer p-4 border-t border-base-700 flex flex-col gap-3">
        <p className="text-sm ">
          <span className="font-semibold text-primary">Title:</span>{" "}
          {item.type === "thesis" ? item.thesis?.thesisTitle : item.project?.projectTitle}{" "}
          <span className="text-xs font-medium text-secondary">({item.type})</span>
        </p>
        {
          (role === 'admin' || role === 'superadmin') && (
            <div className="flex gap-2 justify-end flex-wrap">
              {item.stdntstatus !== "completed" && (
                <button
                  onClick={() => statusMutation.mutate(item._id)}
                  className="btn btn-sm bg-green-400 hover:bg-green-600 text-white border-none flex items-center gap-2 p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Completed
                </button>
              )}

              <button
                onClick={() => {
                  Swal.fire({
                    title: `Are you sure to delete ${item.student?.studentName}?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Yes, delete it!"
                  }).then((result) => {
                    if (result.isConfirmed) deleteMutation.mutate(item._id);
                  });
                }}
                className="btn btn-sm bg-red-400 hover:bg-red-600 text-white border-none flex items-center gap-2 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 14H5L4 7z" />
                </svg>
                Delete
              </button>
            </div>
          )
        }

      </footer>
    </div>
  );
}