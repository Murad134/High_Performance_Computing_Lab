
// import React from "react";
// import { Link } from "react-router-dom";
// export default function CardProject({
//   item,
//   activeTab,
//   onMarkComplete,
//   onMarkIncomplete
// }) {
//   const { id } = item;

//   return (
//     <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-300 transition duration-300 ease-in-out flex flex-col gap-4 justify-between h-full">

//       {/* Project Image */}
//       {item.projectImage && (
//         <img
//           src={item.projectImage}
//           alt={item.name}
//           className="w-full h-48 object-cover rounded-md border border-gray-200"
//         />
//       )}

//       {/* Title */}
//       <h3 className="text-lg font-semibold text-gray-900 px-3">
//         {item.name}
//       </h3>

//       {/* Dates - Conditional Display */}
//       <div className="text-sm text-gray-600 px-3">
//         {activeTab === "current" ? (
//           // Current projects: Show only start date
//           <>📅 Started: {item.startDate}</>
//         ) : (
//           // Completed projects: Show start date and end date
//           <>📅 {item.startDate} — {item.endDate}</>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="mt-auto px-3 pb-3 flex items-center gap-2">

//         {/* Read More */}
//         <Link
//           to={`/publication/projects/${id}`}
//           className="text-indigo-600 text-sm font-medium hover:underline"
//         >
//           READ MORE →
//         </Link>

//         {/* Conditional Button */}
//         {activeTab === "current" ? (
//           <button
//             onClick={() => onMarkComplete(id)}
//             className="ml-auto bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
//           >
//             Complete
//           </button>
//         ) : (
//           <button
//             onClick={() => onMarkIncomplete(id)}
//             className="ml-auto bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
//           >
//             Not Complete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";

export default function CardProject({
  item,
  activeTab,
  onMarkComplete,
  onMarkIncomplete
}) {
  const { id } = item;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-300 transition duration-300 ease-in-out flex flex-col gap-4 justify-between h-full">

      {item.projectImage && (
        <img
          src={item.projectImage}
          alt={item.name}
          className="w-full h-48 object-cover rounded-md border border-gray-200"
        />
      )}

      <h3 className="text-lg font-semibold text-gray-900 px-3">
        {item.name}
      </h3>

      <div className="text-sm text-gray-600 px-3">
        {activeTab === "current" ? (
          <>📅 Started: {item.startDate}</>
        ) : (
          <>📅 {item.startDate} — {item.endDate}</>
        )}
      </div>

      <div className="mt-auto px-3 pb-3 flex items-center gap-2">

        {/* ✅ এইটা change করুন - state add করুন */}
        <Link
          to={`/publication/projects/${id}`}
          state={{ updatedProject: item }}
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          READ MORE →
        </Link>

        {activeTab === "current" ? (
          <button
            onClick={() => onMarkComplete(id)}
            className="ml-auto bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
          >
            Complete
          </button>
        ) : (
          <button
            onClick={() => onMarkIncomplete(id)}
            className="ml-auto bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
          >
            Not Complete
          </button>
        )}
      </div>
    </div>
  );
}