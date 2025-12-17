// import { Link, useLoaderData } from "react-router-dom";

// function Departments() {
//     const data = useLoaderData();

//     // Extract data from JSON structure
//     const laboratory = data.laboratory;
//     const departments = data.departments;

//     return (
//         <div>
//             {/* Breadcrumb */}
//             <div className="mb-6 text-sm text-gray-600">
//                 <span className="font-semibold">{laboratory}</span> &gt;
//                 <span className="text-blue-600"> Research</span> &gt;
//                 <span className="text-blue-600"> Departments</span>
//             </div>
//             {/* Page Title */}
//             <h1 className="text-4xl font-light text-gray-700 mb-8">Departments</h1>

//             {/* Main Content Card */}
//             <div className="rounded-lg p-8">

//                 {/* Departments List */}
//                 <div className="space-y-8">
//                     {departments.map((dept, index) => (
//                         <div key={dept.id} className="border-l-4 border-pink-400 pl-6 hover:bg-pink-50 transition-colors rounded-r-lg py-2">

//                             {/* Department Name */}
//                             <h3 className="text-pink-500 font-medium text-xl mb-3">
//                                 <Link
//                                     to={`/researchs/departments/${dept.slug}`}
//                                     className="hover:underline hover:text-pink-600 transition-colors"
//                                 >
//                                     {index + 1}. {dept.name}
//                                 </Link>
//                             </h3>
//                             {/* HCERES Documents */}
//                             <div className="text-gray-700 text-sm pt-3 border-t border-gray-100">
//                                 • <a
//                                     href={dept.hceres.documentUrl}
//                                     className="text-pink-500 hover:underline hover:text-pink-700 transition-colors"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     HCERES Self-assessment document
//                                 </a>{" "}
//                                 <span className="text-gray-500">({dept.hceres.period} period)</span> and its{" "}
//                                 <a
//                                     href={dept.hceres.portfolioUrl}
//                                     className="text-pink-500 hover:underline hover:text-pink-700 transition-colors"
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     portfolio
//                                 </a>.
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
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
                <Link to="/" className="font-semibold text-red-500">{laboratory}</Link> &gt;
                <Link to="/research/researchs" className="text-blue-600"> Research</Link> &gt;
                <Link to="/research/researchs/departments" className="text-blue-600"> Departments</Link>
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
                                    to={`/research/researchs/departments/${dept.slug}`}
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