import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Building, User, Calendar, FileText, ChevronRight, Home, Search, ArrowRight, Award, BookOpen, Users, GraduationCap } from "lucide-react";
import useAxios from "../../hooks/useAxios";

function Departments() {
    const axiosInstance = useAxios();

    // Fetch departments
    const { data: departments = [], isLoading, isError } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await axiosInstance.get("/departments");
            return res.data;
        },
    });

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-teal-700 font-semibold text-lg">Loading Academic Departments...</p>
                    <p className="text-slate-500 text-sm mt-2">Retrieving department information from our research database</p>
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
                    <p className="text-slate-600">Unable to retrieve academic department information</p>
                    <p className="text-slate-500 text-sm mt-2">Please check your network connection and try again</p>
                </div>
            </div>
        );
    }

    // Sort departments by departmentNo ascending
    const sortedDepartments = [...departments].sort((a, b) => {
        return Number(a.departmentNo) - Number(b.departmentNo);
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Academic Header with Enhanced Context */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
                            <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                                Reasearch Departments
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full mt-4"></div>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Explore our specialized research departments, each dedicated to advancing knowledge in their respective fields
                            through rigorous scholarly inquiry and innovative research methodologies.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 mt-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full border border-teal-200">
                                <Users className="w-4 h-4 text-teal-600" />
                                <span className="text-teal-700 font-medium text-sm">{departments.length} Research Departments</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-full border border-cyan-200">
                                <BookOpen className="w-4 h-4 text-cyan-600" />
                                <span className="text-cyan-700 font-medium text-sm">Peer-Reviewed Publications</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                                <Award className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-700 font-medium text-sm">Academic Excellence</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Breadcrumb Navigation */}
                <div className="mb-10">
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
                        <span className="flex items-center gap-2 text-teal-700 font-semibold">
                            <Building className="w-4 h-4" />
                            Academic Departments
                        </span>
                    </nav>
                </div>

                {/* Departments Grid with Enhanced Academic Presentation */}
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1">

                    {sortedDepartments.map((dept,) => (
                        <div
                            key={dept._id}
                            className="group bg-white border border-teal-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-teal-100/50 hover:border-teal-300 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                        >

                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

                            <div className="flex gap-6 relative z-10">

                                {/* Department Icon with Academic Badge */}
                                <div className="flex-shrink-0 relative">
                                    <div className="p-5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <Building className="w-10 h-10 text-white" />
                                    </div>
                                    {/* Department Number Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                        <span className="text-white font-bold text-xs">{dept.departmentNo}</span>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-5">

                                    {/* Department Name & Academic Title */}
                                    <div className="space-y-2">
                                        <Link
                                            to={`${dept._id}`}
                                            className="block group/link"
                                        >
                                            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight group-hover:text-teal-700 transition-colors duration-300 group-hover/link:underline decoration-teal-500 decoration-2 underline-offset-4">
                                                {dept.name}
                                            </h3>
                                        </Link>
                                        <p className="text-teal-600 font-medium text-sm uppercase tracking-wide">
                                            Department {dept.departmentNo}
                                        </p>
                                    </div>

                                    {/* Department Details with Enhanced Academic Presentation */}
                                    <div className="space-y-4 pt-6 border-t border-slate-100">

                                        {/* Head of Department */}
                                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <div className="p-2 bg-teal-100 rounded-lg">
                                                <User className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                                    Department Chair
                                                </h4>
                                                <p className="text-slate-800 font-semibold text-lg">{dept.headName}</p>
                                                <p className="text-slate-600 text-sm">Ph.D. Program Director</p>
                                            </div>
                                        </div>

                                        {/* Establishment Year */}
                                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <div className="p-2 bg-cyan-100 rounded-lg">
                                                <Calendar className="w-5 h-5 text-cyan-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1">
                                                    Established
                                                </h4>
                                                <p className="text-slate-800 font-semibold text-lg">{dept.startingYear}</p>
                                                <p className="text-slate-600 text-sm">
                                                    {new Date().getFullYear() - dept.startingYear} years of academic excellence
                                                </p>
                                            </div>
                                        </div>

                                        {/* Department Documentation */}
                                        {dept.documents && (
                                            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                                <div className="p-2 bg-emerald-100 rounded-lg">
                                                    <FileText className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                                        Department Resources
                                                    </h4>
                                                    <a
                                                        href={dept.documents}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl group/doc"
                                                    >
                                                        <span>View Department Handbook</span>
                                                        <ArrowRight className="w-4 h-4 group-hover/doc:translate-x-1 transition-transform" />
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                    {/* Enhanced Action Button */}
                                    <div className="pt-4">
                                        <Link
                                            to={`${dept._id}`}
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-2xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl group/btn w-full justify-center"
                                        >
                                            <span className="text-lg">Explore Research Department</span>
                                            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Empty State */}
                {departments.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-32 h-32 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Building className="w-16 h-16 text-teal-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-700 mb-4">No Academic Departments Found</h3>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            Our research departments are currently being established. Academic departments and their scholarly
                            contributions will be displayed here once they become available in our research database.
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/research/researchs"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
                            >
                                <span>Return to Research</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Academic Footer Information */}
                <div className="mt-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-xl font-bold text-slate-700 mb-4">Academic Excellence Through Research</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Each department represents a specialized area of scholarly inquiry, fostering innovation,
                            collaboration, and the advancement of knowledge in their respective fields. Our faculty
                            members are committed to excellence in teaching, research, and service to the academic community.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Departments;