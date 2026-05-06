
// CardProject.jsx
import React from "react";
import { Link } from "react-router-dom";
import useUserRole from "../../hooks/useUserRole";
import { BookOpen, User, Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react";

const CardProject = ({ item, onMarkComplete, onMarkIncomplete }) => {
  const { role } = useUserRole();
  const nestedId = item.type === "project" ? item.project?._id : item.thesis?._id;
  const nestedStatus = item.type === "project" ? item.project?.projectstatus : item.thesis?.thesisstatus;

  const isCurrent = nestedStatus === "ongoing";
  const isCompleted = nestedStatus === "completed";

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return {
          icon: CheckCircle,
          bg: 'bg-teal-100',
          text: 'text-teal-800',
          border: 'border-teal-200'
        };
      case 'ongoing':
        return {
          icon: Clock,
          bg: 'bg-teal-100',
          text: 'text-teal-800',
          border: 'border-teal-200'
        };
      default:
        return {
          icon: Clock,
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200'
        };
    }
  };

  const statusConfig = getStatusConfig(nestedStatus);

  return (
    <div className="bg-white border border-teal-200 rounded-lg shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden group">

      {/* Status Badge */}
      <div className="flex justify-between items-start p-4 pb-2 border-b border-teal-100">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
          <statusConfig.icon className="w-3 h-3" />
          <span className="capitalize">{nestedStatus || 'Unknown'}</span>
        </div>
        <div className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded">
          {item.type === "project" ? 'Project' : 'Thesis'}
        </div>
      </div>

      {/* Project / Thesis Image */}
      {(item.type === "project" ? item.project?.projectImage : item.thesis?.thesisImage) && (
        <div className="px-4 pb-4">
          <div className="relative overflow-hidden rounded-lg border-2 border-teal-200 shadow-sm">
            <img
              src={item.type === "project" ? item.project.projectImage : item.thesis.thesisImage}
              alt={item.type === "project" ? item.project.projectTitle : item.thesis.thesisTitle}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 pb-4">

        {/* Project / Thesis Title */}
        <div className="mb-4 border-b border-teal-100 pb-4">
          <div className="flex items-start gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-teal-600 leading-tight line-clamp-2">
              {item.type === "project" ? item.project?.projectTitle : item.thesis?.thesisTitle}
            </h3>
          </div>
        </div>

        {/* Student Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-teal-600" />
            <span className="font-medium">{item.student.studentName}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>{item.student.studentLevel}</span>
          </div>

          {item.student.session && (
            <div className="text-gray-600 ml-6">
              Session: {item.student.session}
            </div>
          )}

          {item.student.roll && (
            <div className="text-gray-600 ml-6">
              Roll: {item.student.roll}
            </div>
          )}

          {item.student.department && (
            <div className="text-gray-600 ml-6 font-medium">
              Dept: {item.student.department}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-4 pb-4 mt-auto border-t border-teal-100 pt-4">
        <div className="flex items-center justify-between gap-3">

          {/* READ MORE LINK */}
          <Link
            to={`/supervison/projects/${nestedId}`}
            state={{ updatedProject: item }}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors group/link"
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {/* Admin Action Buttons */}
          <div className="flex gap-2">
            {(role === 'admin' || role === 'superadmin') && isCurrent && (
              <button
                onClick={() => onMarkComplete(nestedId, item.type)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-2 rounded-md transition-colors flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" />
                Complete
              </button>
            )}

            {(role === 'admin' || role === 'superadmin') && isCompleted && (
              <button
                onClick={() => onMarkIncomplete(nestedId, item.type)}
                className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-2 rounded-md transition-colors flex items-center gap-1"
              >
                <Clock className="w-3 h-3" />
                Ongoing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;