import { Link } from "react-router-dom";
import ResearchLayout from "./ResearchLayout";

export default function ResearchHome() {
  const departments = [
    { num: 1, title: "Algorithms, Computation, Image & Geometry" },
    { num: 2, title: "Formal methods" },
    { num: 3, title: "Networks, Systems and Services" },
    { num: 4, title: "Natural Language Processing & Knowledge Discovery" },
    { num: 5, title: "Complex Systems, Artificial Intelligence and Robotics" }
  ];

  return (
    <ResearchLayout>
      <div className="mb-6 text-sm text-gray-600">
        <span className="font-semibold">LORIA</span> &gt; <span className="text-blue-600">Research</span>
      </div>

      <h1 className="text-4xl font-light text-gray-700 mb-8">Research</h1>

      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <p className="text-gray-700 leading-relaxed mb-6">
          Through its 28 research teams, the LORIA has recognized expertise in Information 
          and Communication Sciences and Technologies. The laboratory is structured in 
          five departments:
        </p>

        <div className="space-y-6">
          {departments.map(dept => (
            <div key={dept.num}>
              <h3 className="text-pink-500 font-medium mb-2">
                {dept.num}. {dept.title}
              </h3>
              <ul className="ml-6">
                <li className="text-gray-700">
                  • <Link to="#" className="text-pink-500 hover:underline">HCERES Self-assessment document</Link> (2016–2021 period) and its <Link to="#" className="text-pink-500 hover:underline">portfolio</Link>.
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ResearchLayout>
  );
}