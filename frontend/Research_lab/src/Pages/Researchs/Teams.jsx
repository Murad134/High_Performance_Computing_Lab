// import useAxios from "../../hooks/useAxios";
// import { Link } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// function Teams() {
//   const axiosSecure = useAxios();
//   const queryClient = useQueryClient();



//   /* ================= FETCH DEPARTMENTS ================= */
//   const { data: departments = [] } = useQuery({
//     queryKey: ["departments"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/departments");
//       return res.data;
//     },
//   });

//   return (
//     <div className="px-1">
//       {/* Breadcrumb */}
//       <div className="mb-6 text-sm flex items-center space-x-2">
//         <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">HPC</Link>
//         <span className="text-gray-400">/</span>
//         <Link to="/research/researchs" className="text-pink-600 hover:text-pink-700 font-medium">Research</Link>
//         <span className="text-gray-400">/</span>
//         <span className="text-gray-800 font-semibold">Teams</span>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
//         Research Teams
//       </h1>

//       {/* Teams Table */}
//       <div className="overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gradient-to-r from-pink-50 to-pink-100 border-b border-gray-200">
//             <tr>
//               <th className="py-4 px-6 font-semibold text-gray-700 w-1/4">Department</th>
//               <th className="py-4 px-6 font-semibold text-gray-700 w-1/6">Team</th>
//               <th className="py-4 px-6 font-semibold text-gray-700">Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(groupedTeams).map((dept) =>
//               dept.teams.map((team, teamIdx) => (
//                 <tr
//                   key={team.id}
//                   className="border-b border-gray-200 hover:bg-pink-50 transition-colors duration-200"
//                 >
//                   {/* Department Cell */}
//                   <td className="py-4 px-6 align-top">
//                     {teamIdx === 0 && (
//                       <div>
//                         <div className="font-bold text-gray-900">{dept.name}</div>
//                         <div className="font-medium text-pink-600">{dept.fullName}</div>
//                       </div>
//                     )}
//                   </td>

//                   {/* Team Name Cell */}
//                   <td className="py-4 px-6 align-top">
//                     <Link
//                       to={`/research/researchs/teams/${team.name}`}
//                       className="text-pink-600 hover:text-pink-700 font-medium underline decoration-pink-400"
//                     >
//                       {team.name}
//                     </Link>
//                   </td>

//                   {/* Description Cell */}
//                   <td className="py-4 px-6 align-top text-gray-700">
//                     {team.description}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// export default Teams;




// import useAxios from "../../hooks/useAxios";
// import { Link } from "react-router-dom";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// function Teams() {
//   const axiosSecure = useAxios();
//   const queryClient = useQueryClient();

//   /* ================= FETCH DEPARTMENTS ================= */
//   const { data: departments = [] } = useQuery({
//     queryKey: ["departments"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/departments");
//       return res.data;
//     },
//   });

//   return (
//     <div className="px-1">
//       {/* Breadcrumb */}
//       <div className="mb-6 text-sm flex items-center space-x-2">
//         <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">HPC</Link>
//         <span className="text-gray-400">/</span>
//         <Link to="/research/researchs" className="text-pink-600 hover:text-pink-700 font-medium">Research</Link>
//         <span className="text-gray-400">/</span>
//         <span className="text-gray-800 font-semibold">Teams</span>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
//         Research Teams
//       </h1>

//       {/* Teams Table */}
//       <div className="overflow-hidden">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gradient-to-r from-pink-50 to-pink-100 border-b border-gray-200">
//             <tr>
//               <th className="py-4 px-6 font-semibold text-gray-700 w-1/4">Department</th>
//               <th className="py-4 px-6 font-semibold text-gray-700 w-1/6">Team</th>
//               <th className="py-4 px-6 font-semibold text-gray-700">Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(groupedTeams).map((dept) =>
//               dept.teams.map((team, teamIdx) => (
//                 <tr
//                   key={team.id}
//                   className="border-b border-gray-200 hover:bg-pink-50 transition-colors duration-200"
//                 >
//                   {/* Department Cell */}
//                   <td className="py-4 px-6 align-top">
//                     {teamIdx === 0 && (
//                       <div>
//                         <div className="font-bold text-gray-900">{dept.name}</div>
//                         <div className="font-medium text-pink-600">{dept.fullName}</div>
//                       </div>
//                     )}
//                   </td>

//                   {/* Team Name Cell */}
//                   <td className="py-4 px-6 align-top">
//                     <Link
//                       to={`/research/researchs/teams/${team.name}`}
//                       className="text-pink-600 hover:text-pink-700 font-medium underline decoration-pink-400"
//                     >
//                       {team.name}
//                     </Link>
//                   </td>

//                   {/* Description Cell */}
//                   <td className="py-4 px-6 align-top text-gray-700">
//                     {team.description}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// export default Teams;



import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function Teams() {
  const axiosSecure = useAxios();

  /* ================= FETCH DEPARTMENTS ================= */
  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/departments");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="px-2 py-4">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm flex items-center space-x-2">
        <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">
          HPC
        </Link>
        <span className="text-gray-400">/</span>
        <Link
          to="/research/researchs"
          className="text-pink-600 hover:text-pink-700 font-medium"
        >
          Research
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-800 font-semibold">Teams</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
        Research Teams
      </h1>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-pink-50 to-pink-100 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 font-semibold text-gray-700 w-1/4">
                Department
              </th>
              <th className="py-4 px-6 font-semibold text-gray-700 w-1/6">
                Team
              </th>
              <th className="py-4 px-6 font-semibold text-gray-700">
                Description
              </th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) =>
              dept.teams?.map((team, idx) => (
                <tr
                  key={team._id}
                  className="border-b border-gray-200 hover:bg-pink-50 transition-colors"
                >
                  {/* Department */}
                  <td className="py-4 px-6 align-top">
                    {idx === 0 && (
                      <div>
                        <div className="font-bold text-red-600">
                          {dept.name}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Team */}
                  <td className="py-4 px-6 align-top">
                    <Link
                      to={`/research/researchs/teams/${team._id}`}
                      className="text-pink-600 hover:text-pink-700 font-medium underline decoration-pink-400"
                    >
                      {team.teamName}
                    </Link>
                  </td>

                  {/* Description */}
                  <td className="py-4 px-6 align-top text-gray-700">
                    {team.description}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;