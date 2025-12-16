import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const ViewDetails = () => {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ এইটা add করুন

  // ✅ এইটা change করুন
  const project = location.state?.updatedProject || loaderData;

  const {
    name,
    startDate,
    endDate,
    department,
    studentName,
    session,
    details,
    technologies,
    projectImage,
    isCompleted,
  } = project;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={projectImage}
          alt={name}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{name}</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Start Date:</span> {startDate}
            </p>

            {isCompleted && endDate && (
              <p className="text-gray-600">
                <span className="font-semibold">End Date:</span> {endDate}
              </p>
            )}
          </div>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Department:</span> {department}
          </p>

          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Member:</span> {studentName}{" "}
            <span className="ml-2 text-sm text-gray-500">(Session: {session})</span>
          </p>

          <div className="mb-4">
            <span className="font-semibold text-gray-700">Technologies:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-700 mt-6">
            <span className="font-semibold">Description:</span> {details}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;