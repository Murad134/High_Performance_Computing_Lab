
// CardProject.jsx
import React from "react";
import { Link } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";

const CardProject = ({ item, onMarkComplete, onMarkIncomplete }) => {
  const { role } = useUserRole();
  // const id = item._id; // backend document id
  const nestedId = item.type === "project" ? item.project?._id : item.thesis?._id;

  // ✅ Use nested status for buttons and tab determination
  const nestedStatus = item.type === "project" ? item.project?.projectstatus : item.thesis?.thesisstatus;

  const isCurrent = nestedStatus === "ongoing";
  const isCompleted = nestedStatus === "completed";

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-300 transition duration-300 ease-in-out flex flex-col gap-4 justify-between h-full">

      {/* Project / Thesis Image */}
      {(item.type === "project" ? item.project?.projectImage : item.thesis?.thesisImage) && (
        <img
          src={item.type === "project" ? item.project.projectImage : item.thesis.thesisImage}
          alt={item.type === "project" ? item.project.projectTitle : item.thesis.thesisTitle}
          className="w-full h-48 object-cover rounded-md border border-gray-200"
        />
      )}

      {/* Project / Thesis Title */}
      <h3 className="text-lg font-bold text-gray-900 px-3 border-t border-gray-300 pt-2">
        Title : {item.type === "project" ? item.project?.projectTitle : item.thesis?.thesisTitle}
      </h3>

      {/* Student Info */}
      <div className="px-3 text-gray-700 text-sm">
        <p>
          <span className="font-semibold">Student:</span> {item.student.studentName}
        </p>
        <p>
          <span className="font-semibold">Program:</span> {item.student.studentLevel}
        </p>
        {item.student.session && (
          <p>
            <span className="font-semibold">Session:</span> {item.student.session}
          </p>
        )}
        {item.student.roll && (
          <p>
            <span className="font-semibold">Roll:</span> {item.student.roll}
          </p>
        )}
        {
          item.student.department && (
            <p>
              <span className="font-semibold">Department:</span> {item.student.department}
            </p>
          )
        }
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto px-3 pt-2 pb-3 flex items-center gap-2 border-t border-gray-300">

        {/* READ MORE LINK */}
        <Link
          to={`/supervison/projects/${nestedId}`}
          state={{ updatedProject: item }}
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          READ MORE →
        </Link>

        {/* Complete / Not Complete Buttons */}
        {
          role === 'admin' &&
          isCurrent && (
            <button
              onClick={() => onMarkComplete(nestedId, item.type)}
              className="ml-auto bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            >

              Complete
            </button>
          )
        }

        {
          role === 'admin' &&
          isCompleted && (
            <button
              onClick={() => onMarkIncomplete(nestedId, item.type)}
              className="ml-auto bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
            >
              Not Complete
            </button>
          )
        }
      </div>
    </div>
  );
};

export default CardProject;