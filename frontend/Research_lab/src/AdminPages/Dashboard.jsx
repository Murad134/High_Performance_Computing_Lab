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
  });
  const formatDate = (date) => {
    if (!date) return "No updates yet";

    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Quick links (same as yours)
  const quickLinks = [
    { label: "Home Info", path: "/admin/information/home", icon: "🏠" },
    { label: "Images", path: "/admin/information/image", icon: "🖼️" },

    { label: "About Lab", path: "/admin/about/lab", icon: "🏫" },
    { label: "Professor", path: "/admin/about/professor", icon: "👨‍🏫" },
    { label: "Research Interest", path: "/admin/about/research-interest", icon: "🧠" },

    { label: "Departments", path: "/admin/research/departments", icon: "🏢" },
    { label: "Teams", path: "/admin/research/teams", icon: "👥" },
    { label: "Projects", path: "/admin/research/other-country-projects", icon: "💻" },

    { label: "Journal", path: "/admin/publication/journal", icon: "📘" },
    { label: "Conference", path: "/admin/publication/conferences", icon: "🎤" },
    { label: "Seminar", path: "/admin/publication/seminar", icon: "📊" },

    { label: "Members", path: "/admin/members", icon: "👨‍🔬" },
    { label: "Contacts", path: "/admin/contacts", icon: "📬" },
    { label: "Footer", path: "/admin/footer", icon: "⚙️" },
  ];

  // 🔥 Dynamic stats
  const stats = [
    { label: "Total Members", value: statsData.members || 0, color: "from-blue-500 to-blue-600", icon: "👥" },
    { label: "Publications", value: statsData.publications || 0, color: "from-green-500 to-green-600", icon: "📘" },
    { label: "Professor Experience", value: statsData.totalProfExperience || 0, color: "from-orange-500 to-orange-600", icon: "⏳" },
    { label: "Projects", value: statsData.projects || 0, color: "from-purple-500 to-purple-600", icon: "🌍" },
    { label: "Thesis", value: statsData.thesis || 0, color: "from-yellow-500 to-yellow-600", icon: "🎓" },
    { label: "Teams", value: statsData.teams || 0, color: "from-pink-500 to-pink-600", icon: "🏢" },
    { label: "Departments", value: statsData.departments || 0, color: "from-indigo-500 to-indigo-600", icon: "🏫" },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-10 font-poppins">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your system efficiently from one place
        </p>
      </div>

      {/* 🔥 LOADING STATE */}
      {isLoading ? (
        <div className="text-center text-gray-500 py-20 text-lg">
          Loading dashboard data...
        </div>
      ) : (
        <>
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${stat.color} hover:scale-[1.03] transition-transform duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">{stat.label}</p>
                    <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
                  </div>
                  <div className="text-4xl opacity-80">{stat.icon}</div>
                </div>

                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* QUICK ACTIONS */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-2xl group-hover:scale-110 transition">
                {link.icon}
              </span>

              <span className="font-medium text-gray-700 group-hover:text-indigo-600 transition">
                {link.label}
              </span>

              <span className="ml-auto text-gray-300 group-hover:text-indigo-400 transition">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Recent Activity
        </h2>

        <div className="relative bg-white/80 backdrop-blur-lg border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">

          {/* Top Row */}
          <div className="flex items-center justify-between flex-wrap gap-4">

            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 text-lg">
                🕒
              </div>

              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-base font-semibold text-gray-800">
                  {formatDate(statsData.lastUpdated)}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}