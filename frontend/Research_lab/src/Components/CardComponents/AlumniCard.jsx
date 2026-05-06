// AlumniCard.jsx
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUserRole from "../../hooks/useUserRole";
import { User, BookOpen, GraduationCap, Calendar, ArrowLeft, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function AlumniCard({ item }) {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { role } = useUserRole();

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

  const nestedId = item.type === "project" ? item.project?._id : item.thesis?._id;

  return (
    <div className="bg-white border border-teal-200 rounded-lg shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden group">

      {/* Alumni Image */}
      <div className="p-4 pb-2 border-b border-teal-100">
        <div className="relative overflow-hidden rounded-lg border-2 border-teal-200 shadow-sm">
          <img
            src={item.student?.studentImage}
            alt={item.student?.studentName}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-2 right-2 bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium border border-teal-200 flex items-center gap-1">
            <Award className="w-3 h-3" />
            Alumni
          </div>
        </div>
      </div>

      {/* Alumni Info */}
      <div className="flex-1 px-4 pb-4">

        {/* Alumni Name */}
        <div className="mb-4 border-b border-teal-100 pb-4">
          <div className="flex items-start gap-2 mb-2">
            <User className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-teal-600 leading-tight">
              {item.student?.studentName}
            </h3>
          </div>
        </div>

        {/* Alumni Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>Roll: {item.student?.roll}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Session: {item.student?.session}</span>
          </div>

          <div className="text-gray-600 ml-6 font-medium">
            Dept: {item.student?.department}
          </div>
        </div>
      </div>

      {/* Project/Thesis Info & Actions */}
      <div className="px-4 pb-4 mt-auto border-t border-teal-100 pt-4">
        <div className="space-y-3">

          {/* Project/Thesis Title */}
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
                {item.type === "thesis" ? item.thesis?.thesisTitle : item.project?.projectTitle}
              </p>
              <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded mt-1 inline-block">
                {item.type}
              </span>
            </div>
          </div>

          {/* View Details Link */}
          <Link
            to={`/supervison/${item.type === "thesis" ? "thesis" : "projects"}/${nestedId}`}
            state={{ updatedProject: item }}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors group/link"
          >
            <span>View Details</span>
            <ArrowLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
          </Link>

          {/* Admin Actions */}
          {(role === 'admin' || role === 'superadmin') && (
            <div className="flex justify-center pt-2 border-t border-teal-100">
              <button
                onClick={() => backMutation.mutate(item._id)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-3 h-3" />
                Back to Current
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}