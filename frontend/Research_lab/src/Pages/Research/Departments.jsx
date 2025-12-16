// import { Link, useLoaderData } from "react-router-dom";

// function Departments() {
//   const data = useLoaderData();

//   // Extract data from JSON structure
//   const laboratory = data.laboratory;
//   const totalResearchTeams = data.totalResearchTeams;
//   const departments = data.departments;

//   return (
//     <div>
//       {/* Breadcrumb */}
//       <div className="mb-6 text-sm text-gray-600">
//         <span className="font-semibold">{laboratory}</span> &gt; 
//         <span className="text-blue-600"> Research</span> &gt; 
//         <span className="text-blue-600"> Departments</span>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-4xl font-light text-gray-700 mb-8">Departments</h1>

//       {/* Main Content Card */}
//       <div className="bg-white rounded-lg shadow-sm p-8">

//         {/* Introduction Text */}
//         <p className="text-gray-700 leading-relaxed mb-8">
//           Through its {totalResearchTeams} research teams, the {laboratory} has recognized expertise in Information 
//           and Communication Sciences and Technologies. The laboratory is structured in 
//           five departments:
//         </p>

//         {/* Departments List */}
//         <div className="space-y-8">
//           {departments.map((dept, index) => (
//             <div key={dept.id} className="border-l-4 border-pink-400 pl-6 hover:bg-pink-50 transition-colors rounded-r-lg py-2">

//               {/* Department Name */}
//               <h3 className="text-pink-500 font-medium text-xl mb-3">
//                 <Link 
//                   to={`/research/departments/${dept.slug}`} 
//                   className="hover:underline hover:text-pink-600 transition-colors"
//                 >
//                   {index + 1}. {dept.name}
//                 </Link>
//               </h3>

//               {/* Presentation */}
//               {dept.details.presentation && (
//                 <p className="text-gray-600 mb-4 leading-relaxed">
//                   {dept.details.presentation}
//                 </p>
//               )}

//               {/* Details Section */}
//               <div className="space-y-2 text-sm mb-3">
//                 {/* Department Head */}
//                 {dept.details.head && dept.details.head.name && (
//                   <p className="text-gray-700">
//                     <span className="font-semibold text-gray-900">Department Head:</span>{" "}
//                     <span className="text-gray-600">{dept.details.head.name}</span>
//                   </p>
//                 )}

//                 {/* Teams */}
//                 {dept.details.teams && dept.details.teams.length > 0 && (
//                   <p className="text-gray-700">
//                     <span className="font-semibold text-gray-900">Teams ({dept.details.teams.length}):</span>{" "}
//                     <span className="text-gray-600">
//                       {dept.details.teams.map((team, idx) => (
//                         <span key={idx}>
//                           <Link 
//                             to={`/research/teams/${team}`}
//                             className="text-pink-500 hover:underline"
//                           >
//                             {team}
//                           </Link>
//                           {idx < dept.details.teams.length - 1 && ", "}
//                         </span>
//                       ))}
//                     </span>
//                   </p>
//                 )}

//                 {/* Keywords */}
//                 {dept.details.keywords && dept.details.keywords.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {dept.details.keywords.map((keyword, idx) => (
//                       <span 
//                         key={idx}
//                         className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium"
//                       >
//                         {keyword}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* HCERES Documents */}
//               <div className="text-gray-700 text-sm pt-3 border-t border-gray-100">
//                 • <a 
//                     href={dept.hceres.documentUrl} 
//                     className="text-pink-500 hover:underline hover:text-pink-700 transition-colors"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                   HCERES Self-assessment document
//                 </a>{" "}
//                 <span className="text-gray-500">({dept.hceres.period} period)</span> and its{" "}
//                 <a 
//                   href={dept.hceres.portfolioUrl} 
//                   className="text-pink-500 hover:underline hover:text-pink-700 transition-colors"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   portfolio
//                 </a>.
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Summary Footer */}
//         <div className="mt-10 pt-6 border-t border-gray-200">
//           <p className="text-gray-600 text-center">
//             Total of <span className="font-semibold text-pink-600">{departments.length}</span> departments with{" "}
//             <span className="font-semibold text-pink-600">{totalResearchTeams}</span> research teams
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Departments;






import { Link, useLoaderData } from "react-router-dom";

function Departments() {
    const data = useLoaderData();

    // Extract data from JSON structure
    const laboratory = data.laboratory;
    const departments = data.departments;

    return (
        <div>
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-600">
                <span className="font-semibold">{laboratory}</span> &gt;
                <span className="text-blue-600"> Research</span> &gt;
                <span className="text-blue-600"> Departments</span>
            </div>
            {/* Page Title */}
            <h1 className="text-4xl font-light text-gray-700 mb-8">Departments</h1>

            {/* Main Content Card */}
            <div className="rounded-lg p-8">

                {/* Departments List */}
                <div className="space-y-8">
                    {departments.map((dept, index) => (
                        <div key={dept.id} className="border-l-4 border-pink-400 pl-6 hover:bg-pink-50 transition-colors rounded-r-lg py-2">

                            {/* Department Name */}
                            <h3 className="text-pink-500 font-medium text-xl mb-3">
                                <Link
                                    to={`/research/departments/${dept.slug}`}
                                    className="hover:underline hover:text-pink-600 transition-colors"
                                >
                                    {index + 1}. {dept.name}
                                </Link>
                            </h3>
                            {/* HCERES Documents */}
                            <div className="text-gray-700 text-sm pt-3 border-t border-gray-100">
                                • <a
                                    href={dept.hceres.documentUrl}
                                    className="text-pink-500 hover:underline hover:text-pink-700 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    HCERES Self-assessment document
                                </a>{" "}
                                <span className="text-gray-500">({dept.hceres.period} period)</span> and its{" "}
                                <a
                                    href={dept.hceres.portfolioUrl}
                                    className="text-pink-500 hover:underline hover:text-pink-700 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    portfolio
                                </a>.
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Departments;