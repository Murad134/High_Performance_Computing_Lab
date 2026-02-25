// ViewDetails.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  // Fetch single project or thesis
  const { data: item, isLoading } = useQuery({
    queryKey: ["studentproject", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/studentproject/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (!item) return <p className="text-center mt-10">Item not found</p>;

  // Normalize fields
  const isProject = item.type === "project";
  const nested = isProject ? item.project : item.thesis;

  const normalized = {
    title: isProject ? nested.projectTitle : nested.thesisTitle,
    image: isProject ? nested.projectImage : nested.thesisImage,
    startDate: isProject ? nested.projectStartDate : nested.thesisStartDate,
    description: isProject ? nested.projectDetails : nested.abstract,
    status: isProject ? nested.projectstatus : nested.thesisstatus,
    techs: isProject ? nested.technologies : nested.keywords,
    student: item.student || {},
    type: item.type,
  };

  const formattedDate = normalized.startDate
    ? new Date(normalized.startDate).toLocaleDateString("en-GB")
    : "N/A";

  return (
    <div className="flex justify-center items-start min-h-screen p-6">
      <div className="w-full rounded-lg overflow-hidden">

        {/* Header */}
        <div className="p-6 border-gray-200">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-wide">
            Title: <span className="text-indigo-600">{normalized.title}</span>
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4 border-t border-gray-300">

          {/* Student Info */}
          <div className="text-sm space-y-1 text-gray-700">
            <p>
              <span className="font-semibold text-gray-800">Student:</span>{" "}
              <span className="text-gray-900">{normalized.student.studentName}</span> ({normalized.student.studentLevel})
            </p>
            <p>
              <span className="font-semibold text-gray-800">Session:</span>{" "}
              <span className="text-gray-900">{normalized.student.session}</span>
            </p>
            {normalized.student.roll && (
              <p>
                <span className="font-semibold text-gray-800">Roll:</span>{" "}
                <span className="text-gray-900">{normalized.student.roll}</span>
              </p>
            )}
            <p>
              <span className="font-semibold text-gray-800">Department:</span>{" "}
              <span className="text-gray-900">{normalized.student.department}</span>
            </p>
          </div>

          {/* Technologies / Keywords */}
          {normalized.techs?.length > 0 && (
            <div className="text-sm text-gray-700">
              <span className="font-semibold text-gray-800">
                {normalized.type === "project" ? "Technologies:" : "Keywords:"}
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {normalized.techs.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 font-medium text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Start Date */}
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-800">Start Date:</span>{" "}
            <span className="text-gray-900">{formattedDate}</span>
          </p>

          {/* Status */}
          <p className="text-sm font-semibold">
            Status:{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${normalized.status === "completed" ? "bg-green-600 text-white" : "bg-yellow-500 text-white"
                }`}
            >
              {normalized.status}
            </span>
          </p>

          {/* Description / Abstract */}
          <p className="text-sm text-gray-700 border-t pt-2 border-gray-400">
            <span className="font-semibold text-gray-800">
              {normalized.type === "project" ? "Description:" : "Abstract:"}
            </span>{" "}
            <span className="text-gray-900">{normalized.description}</span>
          </p>

        </div>

        {/* Footer: Image + Back Button */}
        <div className="p-6 border-t border-gray-200 flex flex-col gap-4 bg-gray-50">
          {normalized.image && (
            <img
              src={normalized.image}
              alt={normalized.title}
              className="w-full h-64 object-cover rounded-md border border-gray-300 shadow-sm"
            />
          )}
          <div className="flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold shadow"
            >
              Back
            </button>
          </div>
        </div>

      </div>
    </div>

  );
};

export default ViewDetails;