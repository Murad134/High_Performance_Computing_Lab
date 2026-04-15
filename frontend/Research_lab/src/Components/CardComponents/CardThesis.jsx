import React from "react";
import { Link } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";

const CardThesis = ({ item, onMarkComplete, onMarkIncomplete }) => {
  const { role } = useUserRole();

  // const id = item._id; // backend document id
  const nestedId = item.type === "thesis" ? item.thesis?._id : item.project?._id;

  // ✅ Use nested status for buttons and tab determination
  const nestedStatus = item.type === "thesis" ? item.thesis?.thesisstatus : item.project?.projectstatus;

  const isCurrent = nestedStatus === "ongoing";
  const isCompleted = nestedStatus === "completed";
  const publicationDate =
    item.type === "thesis" ? item.thesis?.publicationDate : null;

  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-indigo-300 transition duration-300 ease-in-out flex flex-col gap-4 justify-between h-full p-4">
      {/* Project / Thesis Title */}
      <div>
        <span className="text-sm font-semibold rounded-lg">
          {formattedDate}
        </span>
        <h3 className="text-lg font-bold text-gray-900  pt-2">
          {item.type === "thesis" ? item.thesis?.thesisTitle : item.project?.projectTitle}
        </h3>

      </div>

      {/* Student Info */}
      <div className="text-gray-700 text-sm border-t pt-2 border-gray-300">
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
      <div className="mt-auto pt-2 pb-3 flex items-center gap-2 border-t border-gray-300">

        {/* READ MORE LINK */}
        <Link
          to={`/supervison/thesis/${nestedId}`}
          state={{ updatedThesis: item }}
          className="text-indigo-600 text-sm font-medium hover:underline"
        >
          READ MORE →
        </Link>

        {/* Complete / Not Complete Buttons */}
        {
          (role === 'admin' || role === 'superadmin') &&
          isCurrent && (
            <button
              onClick={() => onMarkComplete(nestedId, item.type)}
              className="ml-auto bg-green-500 hover:bg-green-600 text-white text-xs font-semibold p-2 rounded-lg transition-colors"
            >
              Complete
            </button>
          )
        }
        {
          (role === 'admin' || role === 'superadmin') &&
          isCompleted && (
            <button
              onClick={() => onMarkIncomplete(nestedId, item.type)}
              className="ml-auto bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold p-2 rounded-lg transition-colors"
            >
              Not Complete
            </button>
          )
        }
      </div>
    </div>
  );
}
export default CardThesis;