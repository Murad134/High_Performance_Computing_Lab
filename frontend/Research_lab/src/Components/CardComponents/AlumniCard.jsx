// import React from "react";
// import useAxios from "../../hooks/useAxios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import Swal from "sweetalert2";

// export default function AlumniCard({ item, refetch }) {
//     const axiosSecure = useAxios();
//     const queryClient = useQueryClient();

//     // Mutation to change status from completed → ongoing
//     const backToCurrentMutation = useMutation({
//         mutationFn: async (studentId) => {
//             return axiosSecure.patch(`/studentProject/${studentId}/status`, { status: "ongoing" });
//         },
//         onSuccess: (res) => {
//             // Update local query data so student disappears from alumni section
//             queryClient.setQueryData(['studentProjects'], (oldData) =>
//                 oldData.map((s) => (s._id === item._id ? res.data.data : s))
//             );
//             Swal.fire({ icon: "success", title: "Moved back to Current Students!" });
//             refetch() // Refetch to get the latest data after status update
//         },
//         onError: () => {
//             Swal.fire({ icon: "error", title: "Error updating status!" });
//         },
//     });

//     return (
//         <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300">
//             <figure className="px-4 pt-4">
//                 <img src={item.student?.studentImage} alt={item.student?.studentName} className="rounded-xl h-48 w-full object-cover" />
//             </figure>

//             <div className="card-body p-4">
//                 <h2 className="card-title text-lg">
//                     {item.student?.studentName}
//                     <div className="badge badge-accent ml-2">Alumni</div>
//                 </h2>

//                 <div className="flex justify-between items-center my-2">
//                     <span className="py-1 text-sm">Roll: {item.student?.roll}</span>
//                     <span className="py-1 text-sm">Session: {item.student?.session}</span>
//                 </div>

//                 <p className="text-sm text-base-content/70 line-clamp-2">
//                     <span className="font-semibold text-base text-primary">Title:</span>{" "}
//                     {item.type === 'thesis' ? item.thesisTitle : item.projectTitle}{" "}
//                     <span className="text-xs font-medium text-secondary">({item.type})</span>
//                 </p>

//                 <div className="card-actions justify-end gap-2 mt-4">
//                     <button
//                         onClick={() => backToCurrentMutation.mutate(item._id)}
//                         className="btn btn-sm bg-blue-400 hover:bg-blue-600 text-white border-none flex items-center gap-2 p-2"
//                     >
//                         Back to Current
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

export default function AlumniCard({ item, refetch }) {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // ✅ Mutation to move alumni back to current
  const backToCurrentMutation = useMutation({
    mutationFn: async (studentId) => {
      return axiosSecure.patch(`/studentProject/${studentId}/status`, { status: "ongoing" });
    },
    onSuccess: (res) => {
      queryClient.setQueryData(['studentProjects'], (oldData) =>
        oldData.map((s) => (s._id === item._id ? res.data.data : s))
      );
      Swal.fire({ icon: "success", title: "Moved back to Current Students!" });
      refetch(); // Refetch after status update
    },
    onError: () => {
      Swal.fire({ icon: "error", title: "Error updating status!" });
    },
  });

  return (
    <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">

      {/* Header: Student Picture */}
      <header className="card-header">
        <figure className="w-full h-48 overflow-hidden">
          <img
            src={item.student?.studentImage}
            alt={item.student?.studentName}
            className="w-full h-full object-cover p-1 rounded-t-xl"
          />
        </figure>
      </header>

      {/* Body: Name, Roll, Session */}
      <div className="card-body p-4">
        <h2 className="card-title text-lg flex items-center justify-between">
          {item.student?.studentName}
          <span className="badge badge-accent ml-2">Alumni</span>
        </h2>

        <div className="flex justify-between mt-2 text-sm text-base-content/80">
          <span>Roll: {item.student?.roll}</span>
          <span>Session: {item.student?.session}</span>
        </div>
      </div>

      {/* Footer: Title + Button */}
      <footer className="card-footer p-4 border-t border-base-500 flex flex-col gap-3">
        <p className="text-sm text-base-content/70 line-clamp-2">
          <span className="font-semibold text-base text-primary">Title:</span>{" "}
          {item.type === 'thesis' ? item.thesisTitle : item.projectTitle}{" "}
          <span className="text-xs font-medium text-secondary">({item.type})</span>
        </p>

        <div className="flex justify-end">
          <button
            onClick={() => backToCurrentMutation.mutate(item._id)}
            className="btn btn-sm bg-blue-400 hover:bg-blue-600 text-white border-none flex items-center gap-2 p-2"
          >
            Back to Current
          </button>
        </div>
      </footer>
    </div>
  );
}