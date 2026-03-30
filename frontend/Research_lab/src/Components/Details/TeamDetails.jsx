// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../hooks/useAxios";

// function TeamDetails() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();

//   const { data, isLoading } = useQuery({
//     queryKey: ["team", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/departments");
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center py-10">Loading...</p>;

//   let team = null;
//   let department = null;

//   data.forEach((dept) => {
//     const found = dept.teams?.find((t) => t._id === id);
//     if (found) {
//       team = found;
//       department = dept;
//     }
//   });

//   if (!team) return <p>Team not found</p>;

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">

//       {/* Team Title */}
//       <div className="mb-6">
//         <h1 className="text-4xl font-bold">{team.teamName}</h1>

//         <h2 className="text-xl mt-2">
//           Team Name : {team.fullName}
//         </h2>

//         <p className="mt-2 leading-relaxed">
//           Description : {team.description}
//         </p>

//         <p className="mt-2 font-semibold">
//           Department : {department?.name}
//         </p>
//       </div>

//       {/* Team Head Section */}
//       <div className="bg-gray-50 border rounded-xl p-6 mb-10">
//         <h3 className="text-2xl font-semibold mb-4">
//           Team Head
//         </h3>

//         <div className="space-y-2">
//           <p>
//             <span className="font-semibold">Name:</span>{" "}
//             {team.leaderName}
//           </p>

//           <p>
//             <span className="font-semibold">Email:</span>{" "}
//             {team.leaderEmail}
//           </p>

//           <p>
//             <span className="font-semibold">Portfolio:</span>{" "}
//             <a
//               href={team.leaderPortfolio}
//               target="_blank"
//               rel="noreferrer"
//               className="text-blue-600 underline"
//             >
//               Visit Profile
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Members Section (Link Wise) */}
//       <div className="mb-10">
//         <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
//           Members
//         </h3>

//         <ul className="list-disc ml-6 space-y-2">
//           {team.members?.map((member) => (
//             <li key={member._id}>
//               <Link
//                 to={`/research/researchs/member/${member._id}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 {member.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Other Sections */}
//       <Section title="Vision" data={team.visionStatement} />
//       <Section title="Mission" data={team.mission} />
//       <Section title="Research Areas" data={team.coreResearchAreas} />
//       <Section title="Research Methodology" data={team.researchMethodology} />
//       <Section title="Software & Technical Contributions" data={team.softwareTechnical} />
//       <Section title="Publication Ethics" data={team.publicationEthics} />
//       <Section title="Funding Strategy" data={team.fundingStrategy} />
//       <Section title="Impact Academic" data={team.impactAcademic} />
//       <Section title="Future Mission" data={team.futureMission} />

//     </div>
//   );
// }

// /* Reusable Section Component */

// function Section({ title, data }) {
//   if (!data || data.length === 0) return null;

//   return (
//     <div className="mb-10">
//       <h3 className="text-2xl font-semibold mb-4 border-b pb-2">
//         {title}
//       </h3>

//       <ul className="list-disc ml-6 space-y-2">
//         {data.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TeamDetails;












import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

function TeamDetails() {
  const { id } = useParams();
  const axiosSecure = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["team", id],
    queryFn: async () => {
      const res = await axiosSecure.get("/departments");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-20 text-lg font-medium text-gray-500">
        Loading team details...
      </p>
    );

  let team = null;
  let department = null;

  data.forEach((dept) => {
    const found = dept.teams?.find((t) => t._id === id);
    if (found) {
      team = found;
      department = dept;
    }
  });

  if (!team)
    return (
      <p className="text-center text-red-500 text-xl mt-20">
        Team not found
      </p>
    );

  return (
    <div className="mx-auto px-4 md:px-8 py-12">

      {/* 🔹 Header Card */}
      <div className="bg-gradient-to-r bg-indigo-500 text-white rounded-2xl p-8 shadow-lg mb-10">
        <h1 className="text-4xl font-bold mb-2">{team.teamName}</h1>
        <h2 className="text-xl opacity-90">{team.fullName}</h2>

        <p className="mt-4 max-w-3xl leading-relaxed opacity-90">
          {team.description}
        </p>

        <p className="mt-4 font-semibold">
          Department:{" "}
          <span className="underline text-teal-400">{department?.name}</span>
        </p>
      </div>

      {/* 🔹 Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          <Section title="Vision" data={team.visionStatement} />
          <Section title="Mission" data={team.mission} />
          <Section title="Research Areas" data={team.coreResearchAreas} />
          <Section title="Research Methodology" data={team.researchMethodology} />
          <Section title="Software & Technical Contributions" data={team.softwareTechnical} />
          <Section title="Publication Ethics" data={team.publicationEthics} />
          <Section title="Funding Strategy" data={team.fundingStrategy} />
          <Section title="Impact Academic" data={team.impactAcademic} />
          <Section title="Future Mission" data={team.futureMission} />

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* Team Head */}
          <div className="bg-white border rounded-2xl p-6  hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              👨‍💼 Team Head
            </h3>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {team.leaderName}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {team.leaderEmail}
              </p>

              <a
                href={team.leaderPortfolio}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-indigo-600 font-medium hover:underline"
              >
                🔗 Visit Portfolio
              </a>
            </div>
          </div>

          {/* Members */}
          <div className="bg-white border rounded-2xl p-6  hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              👥 Members
            </h3>

            <ul className="space-y-2">
              {team.members?.map((member) => (
                <li key={member._id}>
                  <Link
                    to={`/research/researchs/member/${member._id}`}
                    className="block px-3 py-2 rounded-lg hover:bg-indigo-50 text-indigo-600 font-medium transition"
                  >
                    {member.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Section */
function Section({ title, data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className=" border rounded-2xl p-6  transition">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        {title}
      </h3>

      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        {data.map((item, index) => (
          <li key={index} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamDetails;