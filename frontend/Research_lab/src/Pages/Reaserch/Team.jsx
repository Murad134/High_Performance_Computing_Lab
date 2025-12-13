import { Link, useLoaderData } from "react-router-dom";
import ResearchLayout from "./ResearchLayout";

export default function Teams() {
  // const data = useLoaderData(); // If you need data from loader

  const teams = [
    { name: "ABC", dept: "", desc: "Machine Learning and Computational Biology" },
    { name: "ADAGIO", dept: "", desc: "Applying Discrete Algorithms to Geometry and Imagery" },
    { name: "PIXEL", dept: "", desc: "Computer Graphics" },
    { 
      name: "CARAMBA", 
      dept: "Department 1\nAlgorithms, Computation, Image and Geometry", 
      desc: "Cryptology, arithmetic: algebraic methods for better algorithms" 
    },
    { name: "GAMBLE", dept: "", desc: "Geometric Algorithms and Models Beyond the Linear and Euclidean Realm" },
    { name: "TANGRAM", dept: "", desc: "Visual Registration with Physically Coherent Models" },
    { name: "MFX", dept: "", desc: "Matter From Graphics" },
    { name: "CARBONE", dept: "", desc: "Advanced Malware Analysis and malware ecosystem studies" },
    { name: "MOCQUA", dept: "", desc: "Mapping of functions and their correlations" },
    { 
      name: "MOSEL-VERIDIS", 
      dept: "Department 2\nFormal methods", 
      desc: "Proof-oriented development of computer-based systems" 
    }
  ];

  const teamsList = [
    'ABC', 'ADAGIO', 'BIRD', 'BISCUIT', 'CAPSID', 'CARAMBA', 
    'CARBONE', 'GAMBLE', 'HUCEBOT', 'K Team', 'LORELEY', 
    'MOCQUA', 'MOSEL-VERIDIS', 'MULTISPEECH', 'NEURORHYTHMS', 
    'OPTIMIST', 'ORPAILLEUR'
  ];

  return (
    <ResearchLayout leftNav={teamsList.map(t => ({ name: t, link: "#" }))}>
      <div className="mb-6 text-sm text-gray-600">
        <span className="font-semibold">LORIA</span> &gt; <span className="text-blue-600">Research</span>
      </div>

      <h1 className="text-4xl font-light text-gray-700 mb-8">Teams</h1>

      <div className="bg-white rounded-lg shadow-sm p-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Department</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Team</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-700">Description</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-pink-500 text-sm whitespace-pre-line align-top">
                  {team.dept}
                </td>
                <td className="py-4 px-4 align-top">
                  <Link to="#" className="text-pink-500 hover:underline font-medium">
                    {team.name}
                  </Link>
                </td>
                <td className="py-4 px-4 text-gray-700 align-top">{team.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResearchLayout>
  );
}