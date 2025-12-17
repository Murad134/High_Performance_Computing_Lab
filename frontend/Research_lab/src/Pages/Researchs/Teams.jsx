// import { Link, useLoaderData } from "react-router-dom";

// function Teams() {
//   const teams = useLoaderData();

//   // Group teams by department
//   const groupedTeams = teams.reduce((acc, team) => {
//     const deptKey = team.departmentName;
//     if (!acc[deptKey]) {
//       acc[deptKey] = {
//         name: team.departmentName,
//         fullName: team.departmentFullName,
//         teams: []
//       };
//     }
//     acc[deptKey].teams.push(team);
//     return acc;
//   }, {});

//   return (
//     <div className="max-w-6xl">
//       {/* Breadcrumb */}
//       <div className="mb-6 text-sm">
//         <Link to="/" className="text-pink-500 hover:underline">LORIA</Link>
//         <span className="text-gray-500"> &gt; </span>
//         <Link to="/research" className="text-pink-500 hover:underline">Research</Link>
//         <span className="text-gray-500"> &gt; </span>
//         <span className="text-pink-500">Teams</span>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-3xl font-light text-gray-800 mb-8">Teams</h1>

//       {/* Teams Table */}
//       <div className="bg-white rounded-lg overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/4">
//                 Department
//               </th>
//               <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/6">
//                 Team
//               </th>
//               <th className="text-left py-3 px-4 font-semibold text-gray-700">
//                 Description
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.values(groupedTeams).map((dept,) => (
//               dept.teams.map((team, teamIdx) => (
//                 <tr
//                   key={team.id}
//                   className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
//                 >
//                   {/* Department Cell - Show only for first team in department */}
//                   <td className="py-3 px-4 align-top">
//                     {teamIdx === 0 && (
//                       <div>
//                         <div className="font-medium text-gray-800">
//                           {dept.name}
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">
//                           {dept.fullName}
//                         </div>
//                       </div>
//                     )}
//                   </td>

//                   {/* Team Name Cell */}
//                   <td className="py-3 px-4 align-top">
//                     <Link
//                       to={`/research/teams/${team.name}`}
//                       className="text-pink-500 hover:underline font-medium"
//                     >
//                       {team.name}
//                     </Link>
//                   </td>

//                   {/* Description Cell */}
//                   <td className="py-3 px-4 align-top text-gray-700">
//                     {team.description}
//                   </td>
//                 </tr>
//               ))
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Teams;


import { Link, useLoaderData } from "react-router-dom";

function Teams() {
  const teams = useLoaderData();

  // Group teams by department
  const groupedTeams = teams.reduce((acc, team) => {
    const deptKey = team.departmentName;
    if (!acc[deptKey]) {
      acc[deptKey] = {
        name: team.departmentName,
        fullName: team.departmentFullName,
        teams: []
      };
    }
    acc[deptKey].teams.push(team);
    return acc;
  }, {});

  return (
    <div className="px-1">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm flex items-center space-x-2">
        <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">HPC</Link>
        <span className="text-gray-400">/</span>
        <Link to="/research/researchs" className="text-pink-600 hover:text-pink-700 font-medium">Research</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-800 font-semibold">Teams</span>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
        Research Teams
      </h1>

      {/* Teams Table */}
      <div className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-pink-50 to-pink-100 border-b border-gray-200">
            <tr>
              <th className="py-4 px-6 font-semibold text-gray-700 w-1/4">Department</th>
              <th className="py-4 px-6 font-semibold text-gray-700 w-1/6">Team</th>
              <th className="py-4 px-6 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedTeams).map((dept) =>
              dept.teams.map((team, teamIdx) => (
                <tr
                  key={team.id}
                  className="border-b border-gray-200 hover:bg-pink-50 transition-colors duration-200"
                >
                  {/* Department Cell */}
                  <td className="py-4 px-6 align-top">
                    {teamIdx === 0 && (
                      <div>
                        <div className="font-bold text-gray-900">{dept.name}</div>
                        <div className="font-medium text-pink-600">{dept.fullName}</div>
                      </div>
                    )}
                  </td>

                  {/* Team Name Cell */}
                  <td className="py-4 px-6 align-top">
                    <Link
                      to={`/research/researchs/teams/${team.name}`}
                      className="text-pink-600 hover:text-pink-700 font-medium underline decoration-pink-400"
                    >
                      {team.name}
                    </Link>
                  </td>

                  {/* Description Cell */}
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
