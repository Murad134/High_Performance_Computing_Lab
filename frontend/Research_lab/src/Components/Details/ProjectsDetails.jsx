// ViewDetails.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { ArrowLeft, Calendar, User, BookOpen, Tag, FileText, CheckCircle, Clock, GraduationCap, Building, Hash, Image as ImageIcon } from "lucide-react";

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

  const formatDescription = (description) => {
    if (!description) return [];

    // If it's already an array, return it
    if (Array.isArray(description)) {
      return description;
    }

    // If it's a string, split by double line breaks or single line breaks
    if (typeof description === 'string') {
      // First try splitting by double line breaks (paragraphs)
      const paragraphs = description.split(/\n\s*\n/).filter(p => p.trim());
      if (paragraphs.length > 1) {
        return paragraphs;
      }

      // If no double line breaks, split by single line breaks
      return description.split('\n').filter(p => p.trim());
    }

    return [description];
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return {
          icon: CheckCircle,
          bg: 'bg-teal-100',
          text: 'text-teal-800',
          label: 'Completed'
        };
      case 'ongoing':
        return {
          icon: Clock,
          bg: 'bg-teal-100',
          text: 'text-teal-800',
          label: 'Ongoing'
        };
      default:
        return {
          icon: Clock,
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: status || 'Unknown'
        };
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600 mx-auto mb-4"></div>
        <p className="text-teal-800 font-medium">Loading...</p>
      </div>
    </div>
  );

  if (!item) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Not Found</h2>
        <p className="text-gray-600 mb-6">The requested item could not be found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

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
    ? new Date(normalized.startDate).toLocaleDateString("en-GB", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "Not Specified";

  const statusConfig = getStatusConfig(normalized.status);
  const descriptionParagraphs = formatDescription(normalized.description);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                  {isProject ? 'Project' : 'Thesis'}
                </span>
                <span className={`${statusConfig.bg} ${statusConfig.text} px-3 py-1 text-sm font-medium rounded-full flex items-center gap-2`}>
                  <statusConfig.icon className="w-4 h-4" />
                  {statusConfig.label}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {normalized.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-teal-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {isProject ? 'Project Description' : 'Abstract'}
                </h2>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "first-letter:text-2xl first-letter:font-bold first-letter:text-teal-600 first-letter:mr-1" : ""}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Technologies / Keywords */}
            {normalized.techs?.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="w-6 h-6 text-teal-600" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {isProject ? 'Technologies Used' : 'Research Keywords'}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {normalized.techs.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full border border-teal-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Image */}
            {normalized.image && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="w-6 h-6 text-teal-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Project Visual</h3>
                </div>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={normalized.image}
                    alt={normalized.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Student Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-semibold text-gray-900">Researcher</h3>
              </div>

              <div className="space-y-3">
                <div className="text-center pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{normalized.student.studentName}</h4>
                  <p className="text-teal-600 text-sm">{normalized.student.studentLevel}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Department:</span>
                    <span className="text-gray-900 font-medium">{normalized.student.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Session:</span>
                    <span className="text-gray-900 font-medium">{normalized.student.session}</span>
                  </div>
                  {normalized.student.roll && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Roll:</span>
                      <span className="text-gray-900 font-medium">{normalized.student.roll}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-semibold text-gray-900">Timeline</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Started</p>
                    <p className="text-sm text-gray-600">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${normalized.status === 'completed' ? 'bg-teal-500' : 'bg-gray-400'}`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Status</p>
                    <p className="text-sm text-gray-600">{statusConfig.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;