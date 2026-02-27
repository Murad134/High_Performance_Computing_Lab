import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const quickLinks = [
    { label: "Edit Home", path: "/admin/edithome", icon: "🏠" },
    { label: "Edit About", path: "/admin/editabout", icon: "📘" },
    { label: "Edit Experience", path: "/admin/editexperience", icon: "🧠" },
    { label: "Edit Contact", path: "/admin/editcontact", icon: "📞" },
    { label: "Edit Member", path: "/admin/editmember", icon: "👥" },
    { label: "Edit Publication", path: "/admin/editpublication", icon: "📚" },
  ];

  const stats = [
    { label: "Total Members", value: 24, color: "bg-blue-100", text: "text-blue-700" },
    { label: "Publications", value: 58, color: "bg-green-100", text: "text-green-700" },
    { label: "Projects", value: 12, color: "bg-purple-100", text: "text-purple-700" },
    { label: "Thesis Supervised", value: 9, color: "bg-pink-100", text: "text-pink-700" },
  ];

  return (
    <section className="mx-auto px-6 py-12 font-poppins">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">🛠️ Admin Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Welcome back, <span className="font-semibold text-indigo-600">Sk. Shalauddin Kabir</span>. Manage your lab content and academic resources efficiently.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl shadow-sm p-6 ${stat.color} ${stat.text} hover:shadow-md transition-transform hover:scale-[1.03]`}
          >
            <h3 className="text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Edit Links */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Edit Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 bg-white border border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700 font-medium py-4 px-5 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

