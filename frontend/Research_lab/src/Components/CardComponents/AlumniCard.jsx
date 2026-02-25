import React from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function AlumniCard({ item }) {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const backMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/studentproject/${id}/status`, {
        stdntstatus: "ongoing",
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["studentProjects"]);
      Swal.fire({
        icon: "success",
        title: "Moved to Current!",
        timer: 1500,
        showConfirmButton: false,
      });
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error updating status!",
      });
    },
  });

  return (
    <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">

      {/* ========= Header ========= */}
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={item.student?.studentImage}
          alt={item.student?.studentName}
          className="w-full h-full object-cover p-2 rounded-xl"
        />
      </figure>

      {/* ========= Body ========= */}
      <div className="card-body p-4 border-t border-base-900">

        <h2 className="card-title text-lg font-semibold mb-2">
          Name : {item.student?.studentName}
        </h2>

        <div className="text-sm space-y-1">
          <p>
            <span className="font-medium">Roll:</span>{" "}
            {item.student?.roll}
          </p>
          <p>
            <span className="font-medium">Session:</span>{" "}
            {item.student?.session}
          </p>
          <p>
            <span className="font-medium">Department:</span>{" "}
            {item.student?.department}
          </p>
        </div>
      </div>

      {/* ========= Footer ========= */}
      <footer className="card-footer p-4 border-t border-base-700 flex flex-col gap-3">

        <p className="text-sm">
          <span className="font-semibold text-primary">Title:</span>{" "}
          {item.type === "thesis"
            ? item.thesis?.thesisTitle
            : item.project?.projectTitle}{" "}
          <span className="text-xs font-medium text-secondary">
            ({item.type})
          </span>
        </p>

        <div className="flex justify-between items-center">

          {/* Alumni Badge */}
          <span className="badge badge-secondary">
            Alumni
          </span>

          {/* Back Button */}
          <button
            onClick={() => backMutation.mutate(item._id)}
            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none p-2 rounded-lg"
          >
            Back to Current
          </button>

        </div>
      </footer>
    </div>
  );
}