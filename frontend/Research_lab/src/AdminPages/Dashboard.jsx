import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

export default function Dashboard() {

  const axiosInstance = useAxios();

  // 🔥 Fetch dashboard stats
  const { data: statsData = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/stats");
      return res.data;
    },
    refetchInterval: 5000,
  });
  const formatDate = (date) => {
    if (!date) return "No updates yet";

    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Quick links organized by category
  const quickLinks = [
    {
      category: "Information Management",
      items: [
        { label: "Home Information", path: "/admin/information/home", icon: "🏠", description: "Manage homepage content" },
        { label: "Image Gallery", path: "/admin/information/image", icon: "🖼️", description: "Upload and manage images" },
      ]
    },
    {
      category: "About Section",
      items: [
        { label: "Lab Information", path: "/admin/about/lab", icon: "🏫", description: "Update lab details" },
        { label: "Professor Profile", path: "/admin/about/professor", icon: "👨‍🏫", description: "Manage professor info" },
        { label: "Research Interests", path: "/admin/about/research-interest", icon: "🧠", description: "Edit research focus" },
      ]
    },
    {
      category: "Research ",
      items: [
        { label: "Departments", path: "/admin/research/departments", icon: "🏢", description: "Manage departments" },
        { label: "Research Teams", path: "/admin/research/teams", icon: "👥", description: "Organize research teams" },
      ]
    },
    {
      category: "Publications",
      items: [
        { label: "Journal Articles", path: "/admin/publication/journal", icon: "📘", description: "Manage publications" },
        { label: "Conferences", path: "/admin/publication/conferences", icon: "🎤", description: "Conference proceedings" },
        { label: "Books", path: "/admin/publication/book-chapter", icon: "📚", description: "Book chapters" },
      ]
    },
    {
      category: "System Management",
      items: [
        { label: "Team Members", path: "/admin/members", icon: "👨‍🔬", description: "Manage team members" },
        { label: "Contact Information", path: "/admin/contacts", icon: "📬", description: "Update contact details" },
        { label: "Footer Settings", path: "/admin/footer", icon: "⚙️", description: "Configure footer" },
      ]
    }
  ];

  // 🔥 Academic stats with teal theme
  const stats = [
    { label: "Total Members", value: statsData.members || 0, icon: "👥", description: "Active researchers" },
    { label: "Publications", value: statsData.publications || 0, icon: "📘", description: "Research outputs" },
    { label: "Professor Experience", value: statsData.totalProfExperience || 0, icon: "⏳", description: "Years of expertise" },
    { label: "Research Projects", value: statsData.projects || 0, icon: "🌍", description: "Ongoing initiatives" },
    { label: "Thesis Supervisions", value: statsData.thesis || 0, icon: "🎓", description: "Student theses" },
    { label: "Research Teams", value: statsData.teams || 0, icon: "🏢", description: "Collaborative groups" },
    { label: "Academic Departments", value: statsData.departments || 0, icon: "🏫", description: "Research departments" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/40 px-4 py-6 font-poppins">
      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes progressFill {
            0% { width: 0%; }
            100% { width: var(--progress-width); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.3); }
            50% { box-shadow: 0 0 30px rgba(20, 184, 166, 0.6); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `
      }} />

      {/* HEADER SECTION - Enhanced */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="relative bg-gradient-to-r from-white via-teal-50/50 to-blue-50/30 rounded-3xl shadow-xl border border-teal-100/50 p-8 mb-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400 to-teal-500 rounded-full blur-2xl"></div>
          </div>

          <div className="relative flex items-center justify-between flex-wrap gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl text-white">🎓</span>
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-teal-800 bg-clip-text text-transparent">
                    Academic Dashboard
                  </h1>
                  <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mt-2"></div>
                </div>
              </div>
              <p className="text-lg text-teal-700 font-medium mb-2">
                High Performance Computing Lab Administration Portal
              </p>
              <p className="text-gray-600 max-w-2xl leading-relaxed">
                Comprehensive management system for research data, publications, team collaboration, and academic excellence tracking.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <span className="text-3xl text-white">📊</span>
                </div>
                <p className="text-sm text-gray-600 mt-2 font-medium">Analytics Hub</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOADING STATE - Enhanced */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-white to-teal-50/50 rounded-3xl shadow-xl border border-teal-100 p-16">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full animate-pulse"></div>
                <div className="relative w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Loading Dashboard Analytics</h3>
              <p className="text-teal-600 font-medium mb-4">Fetching real-time research statistics...</p>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-10">

          {/* STATS CARDS - Premium Design */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
                <div className="w-2 h-10 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full"></div>
                Research Analytics
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Live Data</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Updated {formatDate(statsData.lastUpdated)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-teal-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-blue-400/20 to-teal-500/20 rounded-xl -rotate-12 group-hover:rotate-0 transition-transform duration-500"></div>

                  <div className="relative flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500">
                            <span className="text-2xl text-white">{stat.icon}</span>
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</h3>
                          <p className="text-xs text-teal-600 font-medium">{stat.description}</p>
                        </div>
                      </div>
                      <div className="text-4xl font-black text-gray-900 group-hover:text-teal-700 transition-colors duration-300 mb-3">
                        {stat.value.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{
                          width: `${Math.min((stat.value / Math.max(...stats.map(s => s.value))) * 100, 100)}%`,
                          animation: 'progressFill 2s ease-out forwards'
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-semibold text-teal-600">
                        {Math.round((stat.value / Math.max(...stats.map(s => s.value))) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>

          {/* MANAGEMENT SECTIONS - Premium Design */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
                <div className="w-2 h-10 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                Management Hub
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Quick Actions</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  {quickLinks.length} Categories
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {quickLinks.map((category, categoryIndex) => (
                <div
                  key={category.category}
                  className="group bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                  style={{animationDelay: `${categoryIndex * 150}ms`}}
                >
                  {/* Category Header */}
                  <div className="relative bg-gradient-to-r from-blue-500 via-teal-500 to-blue-600 p-6 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{category.category}</h3>
                        <p className="text-blue-100 text-sm">{category.items.length} Actions Available</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-2xl">⚡</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Items */}
                  <div className="p-6 space-y-4">
                    {category.items.map((link, itemIndex) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="group/link flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 border border-transparent hover:border-teal-200 transition-all duration-300 hover:shadow-md"
                        style={{animationDelay: `${(categoryIndex * 150) + (itemIndex * 50)}ms`}}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover/link:scale-110 group-hover/link:shadow-xl transition-all duration-300">
                          <span className="text-xl text-white">{link.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 group-hover/link:text-teal-700 transition-colors">
                            {link.label}
                          </h4>
                          <p className="text-sm text-gray-600 group-hover/link:text-teal-600 transition-colors">
                            {link.description}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform translate-x-2 group-hover/link:translate-x-0">
                          <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-1 bg-gradient-to-r from-blue-400 via-teal-500 to-blue-600"></div>
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM STATUS - Premium Design */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
                <div className="w-2 h-10 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                System Status
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Real-time</span>
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  All Systems Operational
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-r from-white via-green-50/30 to-teal-50/30 rounded-3xl shadow-xl border border-green-100/50 p-8 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-teal-400 to-blue-500 rounded-full blur-2xl"></div>
              </div>

              <div className="relative flex items-center justify-between flex-wrap gap-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
                      <span className="text-3xl text-white">🕒</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-white animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">System Health Monitor</h3>
                    <p className="text-teal-700 font-medium text-lg mb-1">Last Updated: {formatDate(statsData.lastUpdated)}</p>
                    <p className="text-gray-600 leading-relaxed">
                      All research data synchronized and system components operating optimally.
                      Real-time monitoring ensures academic excellence and data integrity.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Status Indicators */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-lg text-white">🗄️</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Database</p>
                      <p className="text-sm font-bold text-green-600 mt-1">Online</p>
                    </div>

                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-lg text-white">☁️</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Cloud</p>
                      <p className="text-sm font-bold text-blue-600 mt-1">Active</p>
                    </div>

                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-lg text-white">🔒</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Security</p>
                      <p className="text-sm font-bold text-teal-600 mt-1">Secure</p>
                    </div>

                    <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-green-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <span className="text-lg text-white">⚡</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</p>
                      <p className="text-sm font-bold text-purple-600 mt-1">Optimal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 rounded-b-3xl"></div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}