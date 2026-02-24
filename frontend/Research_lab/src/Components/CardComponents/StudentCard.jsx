// import React from "react";
// import useAxios from "../../hooks/useAxios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// export default function StudentCard({ item, refetch }) {
//     const axiosSecure = useAxios();
//     const queryClient = useQueryClient();

//     // Update status
//     const statusMutation = useMutation({
//         mutationFn: async (studentId) => {
//             return axiosSecure.patch(`/studentProject/${studentId}/status`, { status: "completed" });
//         },
//         onSuccess: (res) => {
//             queryClient.setQueryData(['studentProjects'], (oldData) =>
//                 oldData.map((s) => (s._id === item._id ? res.data.data : s))

//             );
//             Swal.fire({ icon: "success", title: "Moved to Alumni!" });
//             refetch() // Refetch to get the latest data after status update
//         },
//         onError: () => {
//             Swal.fire({ icon: "error", title: "Error updating status!" });
//         },
//     });

//     // Delete student
//     const deleteMutation = useMutation({
//         mutationFn: async (id) => {
//             return axiosSecure.delete(`/studentProject/${id}`);
//         },
//         onSuccess: () => {
//             queryClient.setQueryData(['studentProjects'], (oldData) =>
//                 oldData.filter((s) => s._id !== item._id)
//             );
//             Swal.fire({ icon: "success", title: "Student Deleted!" });
//             refetch() // Refetch to get the latest data after deletion
//         },
//         onError: () => {
//             Swal.fire({ icon: "error", title: "Error deleting student!" });
//         },
//     });

//     return (
//         <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300">
//             <figure className="px-4 pt-4">
//                 <img
//                     src={item.student?.studentImage}
//                     alt={item.student?.studentName}
//                     className="rounded-xl h-48 w-full object-cover"
//                 />
//             </figure>

//             <div className="card-body p-4">
//                 <h2 className="card-title text-lg">
//                     {item.student?.studentName}
//                     {item.status === "completed" && (
//                         <div className="badge badge-secondary ml-2">Alumni</div>
//                     )}
//                 </h2>

//                 <div className="flex justify-between items-center my-2">
//                     <span className="py-1 text-sm">Roll: {item.student?.roll}</span>
//                     <span className="py-1 text-sm">Session: {item.student?.session}</span>
//                 </div>

//                 <p className="text-sm text-base-content/70 line-clamp-2">
//                     <span className="font-semibold text-base text-primary">Title:</span>{" "}
//                     {item.type === "thesis" ? item.thesisTitle : item.projectTitle}{" "}
//                     <span className="text-xs font-medium text-secondary">({item.type})</span>
//                 </p>

//                 <div className="card-actions justify-end gap-4 mt-4">
//                     {item.status !== "completed" && (
//                         <button
//                             onClick={() => statusMutation.mutate(item._id)}
//                             className="btn btn-sm bg-green-400 hover:bg-green-600 text-white border-none flex items-center gap-2 p-2"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                             </svg>
//                             Completed
//                         </button>
//                     )}

//                     <button
//                         onClick={() => {
//                             Swal.fire({
//                                 title: `Are you sure to delete ${item.student?.studentName}?`,
//                                 icon: "warning",
//                                 showCancelButton: true,
//                                 confirmButtonColor: "#d33",
//                                 cancelButtonColor: "#3085d6",
//                                 confirmButtonText: "Yes, delete it!"
//                             }).then((result) => {
//                                 if (result.isConfirmed) deleteMutation.mutate(item._id);
//                             });
//                         }}
//                         className="btn btn-sm bg-red-400 hover:bg-red-600 text-white border-none flex items-center gap-2 p-2"
//                     >
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7v10m6-10v10M4 7h16l-1 14H5L4 7z" />
//                         </svg>
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function StudentCard({ item, refetch }) {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // ✅ Mutation to mark student as completed
  const statusMutation = useMutation({
    mutationFn: async (studentId) => {
      return axiosSecure.patch(`/studentProject/${studentId}/status`, { status: "completed" });
    },
    onSuccess: (res) => {
      queryClient.setQueryData(['studentProjects'], (oldData) =>
        oldData.map((s) => (s._id === item._id ? res.data.data : s))
      );
      Swal.fire({ icon: "success", title: "Moved to Alumni!" });
      refetch(); // Refetch after status update
    },
    onError: () => {
      Swal.fire({ icon: "error", title: "Error updating status!" });
    },
  });

  // ✅ Mutation to delete student
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/studentProject/${id}`);
    },
    onSuccess: () => {
      queryClient.setQueryData(['studentProjects'], (oldData) =>
        oldData.filter((s) => s._id !== item._id)
      );
      Swal.fire({ icon: "success", title: "Student Deleted!" });
      refetch(); // Refetch after deletion
    },
    onError: () => {
      Swal.fire({ icon: "error", title: "Error deleting student!" });
    },
  });

  return (
    <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">
      
      {/* Header: Student Image */}
      <header className="card-header">
        <figure className="w-full h-48 overflow-hidden">
          <img
            src={item.student?.studentImage}
            alt={item.student?.studentName}
            className="w-full h-full object-cover p-1 rounded-lg"
          />
        </figure>
      </header>

      {/* Body: Name, Roll, Session */}
      <div className="card-body p-4">
        <h2 className="card-title text-lg flex items-center justify-between">
          {item.student?.studentName}
          {item.status === "completed" && (
            <span className="badge badge-secondary ml-2">Alumni</span>
          )}
        </h2>

        <div className="flex justify-between mt-2 text-sm text-base-content/80">
          <span>Roll: {item.student?.roll}</span>
          <span>Session: {item.student?.session}</span>
        </div>
      </div>

      {/* Footer: Title + Buttons */}
      <footer className="card-footer p-4 border-t border-base-700 flex flex-col gap-3">
        <p className="text-sm text-base-content/70 line-clamp-2">
          <span className="font-semibold text-base text-primary">Title:</span>{" "}
          {item.type === "thesis" ? item.thesisTitle : item.projectTitle}{" "}
          <span className="text-xs font-medium text-secondary">({item.type})</span>
        </p>

        <div className="flex gap-2 justify-end flex-wrap">
          {item.status !== "completed" && (
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
      </footer>
    </div>
  );
}