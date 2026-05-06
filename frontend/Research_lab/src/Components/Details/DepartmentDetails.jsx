import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Building, User, Mail, ExternalLink, Calendar, FileText, Users, Tag, ChevronRight, Home, Search, GraduationCap, Award, BookOpen, ArrowRight } from "lucide-react";
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

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-teal-700 font-semibold text-lg">Loading Department Details...</p>
          <p className="text-slate-500 text-sm mt-2">Retrieving academic department information</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Connection Error</h3>
          <p className="text-slate-600">Unable to retrieve department information</p>
          <p className="text-slate-500 text-sm mt-2">Please check your network connection and try again</p>
        </div>
      </div>
    );
  }

  const keywords = dept.keywords?.split(",");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Enhanced Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center space-x-3 text-sm bg-white rounded-xl px-6 py-4 shadow-sm border border-slate-200">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link
              to="/research/researchs"
              className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 font-medium"
            >
              <Search className="w-4 h-4" />
              <span>Research</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link
              to="/research/researchs/departments"
              className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 font-medium"
            >
              <Building className="w-4 h-4" />
              <span>Departments</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="flex items-center gap-2 text-teal-700 font-semibold">
              <GraduationCap className="w-4 h-4" />
              {dept.name}
            </span>
          </nav>
        </div>

        {/* Academic Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
              <Building className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                {dept.name}
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full mt-4"></div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-slate-600 text-lg leading-relaxed">
              Specialized research department dedicated to advancing knowledge and innovation in {dept.name.toLowerCase()}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full border border-teal-200">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span className="text-teal-700 font-medium text-sm">Established {dept.startingYear}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full border border-cyan-200">
                <Users className="w-4 h-4 text-cyan-600" />
                <span className="text-cyan-700 font-medium text-sm">{dept.teams?.length || 0} Research Teams</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-medium text-sm">Academic Excellence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left Column - Department Information */}
          <div className="lg:col-span-2 space-y-8">

            {/* Department Statement */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-teal-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Department Overview</h2>
              </div>
              <div className="prose prose-slate max-w-none">
                {dept.statement.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-slate-700 leading-relaxed text-lg mb-4 last:mb-0">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Research Keywords */}
            {keywords?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-teal-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Research Focus Areas</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {keywords
                    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                    .map((keyword, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 font-medium rounded-full border border-teal-200 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300"
                      >
                        <Tag className="w-4 h-4" />
                        {keyword.trim()}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Research Teams */}
            {dept.teams?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-teal-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Research Teams</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {dept.teams.map((team) => (
                    <Link
                      key={team._id}
                      to={`/research/researchs/teams/${team._id}`}
                      className="group block p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-medium group-hover:text-teal-700 transition-colors">
                          {team.teamName}
                        </span>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Department Leadership & Resources */}
          <div className="space-y-8">

            {/* Department Chair */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-teal-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Department Chair</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">{dept.headName}</h3>
                  <p className="text-slate-600 text-sm">Ph.D. Program Director</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-500">Email</p>
                      <p className="text-slate-700">{dept.headEmail}</p>
                    </div>
                  </div>

                  <a
                    href={dept.headPortfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 font-medium rounded-lg border border-teal-200 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 group"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>View Academic Profile</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Department Resources */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-teal-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Department Resources</h2>
              </div>

              <div className="space-y-4">
                <a
                  href={dept.documents}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-semibold rounded-xl border border-emerald-200 hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <FileText className="w-5 h-5" />
                  <span>Department Handbook</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Calendar className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                    <p className="text-xs font-medium text-slate-500">Established</p>
                    <p className="text-lg font-bold text-slate-800">{dept.startingYear}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Award className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
                    <p className="text-xs font-medium text-slate-500">Experience</p>
                    <p className="text-lg font-bold text-slate-800">{new Date().getFullYear() - dept.startingYear} Years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-teal-100">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-500 mb-1">Last Updated</p>
                <p className="text-slate-800 font-semibold">
                  {new Date(dept.updated_at || dept.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DepartmentDetails;