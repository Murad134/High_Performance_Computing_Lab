// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../hooks/useAxios";

// const DepartmentDetails = () => {
//   const { id } = useParams(); // get department id from URL
//   const axiosInstance = useAxios();

//   const { data: dept, isLoading, isError } = useQuery({
//     queryKey: ["department", id],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/departments/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;
//   if (isError) return <p className="text-center mt-10 text-red-500">Error loading department!</p>;

//   const keywords = dept.keywords?.split(",");

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
//       {/* Department Info */}
//       <h1 className="text-3xl font-bold text-blue-600 mb-4">{dept.name}</h1>

//       <p><span className="font-semibold">Head Name:</span> {dept.headName}</p>
//       <p><span className="font-semibold">Head Email:</span> {dept.headEmail}</p>
//       <p>
//         <span className="font-semibold">Portfolio:</span>{" "}
//         <a href={dept.headPortfolio} target="_blank" className="text-blue-500 underline">
//           View Profile
//         </a>
//       </p>

//       <div className="mt-3">
//         <p className="font-semibold mb-1">Keywords:</p>
//         <ul className="flex flex-wrap gap-2">
//           {keywords?.map((k, i) => (
//             <li key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{k}</li>
//           ))}
//         </ul>
//       </div>

//       <p className="mt-3"><span className="font-semibold">Statement:</span> {dept.statement}</p>
//       <p className="mt-2"><span className="font-semibold">Starting Year:</span> {dept.startingYear}</p>
//       <p><span className="font-semibold">Latest Update:</span> {new Date(dept.updated_at || dept.updatedAt).toLocaleDateString()}</p>
//       <p className="mt-2">
//         <span className="font-semibold">Document:</span>{" "}
//         <a href={dept.documents} target="_blank" className="text-green-600 underline">
//           Open Document
//         </a>
//       </p>

//       {/* Teams Section - Only names */}
//       {dept.teams?.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-2xl font-bold text-pink-600 mb-3">Teams in this Department</h2>
//           <ul className="list-disc list-inside space-y-1">
//             {dept.teams.map((team) => (
//               <li key={team._id} className="text-gray-700">
//                 {team.teamName}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DepartmentDetails;






import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const DepartmentDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: dept, isLoading, isError } = useQuery({
    queryKey: ["department", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/departments/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading department!
      </p>
    );

  const keywords = dept.keywords?.split(",");

  return (
    <div className="mx-auto px-2 py-4">

      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link to="/" className="text-pink-500 hover:underline">HPC</Link>
        <span className="mx-1 text-gray-400">&gt;</span>
        <Link to="/research/researchs" className="text-pink-500 hover:underline">Research</Link>
        <span className="mx-1 text-gray-400">&gt;</span>
        <Link to="/research/researchs/departments" className="text-pink-500 hover:underline">Departments</Link>
        <span className="mx-1 text-gray-400">&gt;</span>
        <span className="text-pink-500">{dept.name}</span>
      </div>

      {/* Department Title */}
      <h1 className="text-3xl font-light text-gray-800 mb-6">{dept.name}</h1>

      {/* Department Info */}
      <div className="space-y-2 rounded-xl py-3">

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Head</h2>
          <p className="text-gray-700">
            Name: <span className="font-medium">{dept.headName}</span>
          </p>
          <p className="text-gray-700">
            Email: <span className="font-medium">{dept.headEmail}</span>
          </p>
          <p className="text-gray-700">
            Portfolio:{" "}
            <a href={dept.headPortfolio} target="_blank" className="text-blue-500 underline">
              View Profile
            </a>
          </p>
        </section>
        {/* Statement */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Statement</h2>
          <p className="text-gray-700">{dept.statement}</p>
        </section>
        {/* Keywords */}
        {keywords?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Keywords</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {keywords
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map((k, idx) => (
                  <li key={idx}>{k}</li>
                ))}
            </ul>
          </section>
        )}
        {/* Teams */}
        {dept.teams?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Teams</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {dept.teams.map((team) => (
                <li key={team._id}>{team.teamName}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Document */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Document</h2>
          <a
            href={dept.documents}
            target="_blank"
            className="text-green-600 underline"
          >
            Open Document
          </a>
        </section>
        {/* Years and Update */}
        <section className="flex flex-col md:flex-row gap-6 text-gray-700">
          <p><span className="font-semibold">Starting Year:</span> {dept.startingYear}</p>
          <p><span className="font-semibold">Latest Update:</span> {new Date(dept.updated_at || dept.updatedAt).toLocaleDateString()}</p>
        </section>


      </div>
    </div>
  );
};

export default DepartmentDetails;