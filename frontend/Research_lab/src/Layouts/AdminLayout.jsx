import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";

export default function AdminLayout() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };
    const menuStructure = [
        {
            title: "Dashboard",
            path: "/admin",
            icon: "💻"
        },
        {
            title: "Information",
            icon: "📊",
            children: [
                { label: "Home", path: "/admin/information/home" },
                { label: "Image", path: "/admin/information/image" }
            ]
        },
        {
            title: "About",
            icon: "🎓",
            children: [
                { label: "About Lab", path: "/admin/about/lab" },
                { label: "About Professor", path: "/admin/about/professor" },
                { label: "Research Interest", path: "/admin/about/research-interest" }
            ]
        },
        {
            title: "Research",
            icon: "🧪",
            children: [
                { label: "Departments", path: "/admin/research/departments" },
                { label: "Teams", path: "/admin/research/teams" },
                { label: "Navigation", path: "/admin/research/navigation" },
                { label: "Experimental Platforms", path: "/admin/research/experimental-platforms" },
                { label: "Other Country Projects", path: "/admin/research/other-country-projects" }
            ]
        },
        {
            title: "Publication",
            icon: "📝",
            children: [
                { label: "Journal", path: "/admin/publication/journal" },
                { label: "Conferences", path: "/admin/publication/conferences" },
                { label: "Seminar", path: "/admin/publication/seminar" },
                { label: "Book Chapter", path: "/admin/publication/book-chapter" }
            ]
        },
        {
            title: "Supervisors",
            icon: "👨‍💻",
            children: [
                { label: "Academic Thesis", path: "/admin/supervisors/academic-thesis" },
                { label: "Academic Projects", path: "/admin/supervisors/academic-projects" }
            ]
        },
        {
            title: "Members",
            path: "/admin/members",
            icon: "👨‍🔬"
        },
        {
            title: "Contacts",
            path: "/admin/contacts",
            icon: "📬"
        },
        {
            title: "Footer",
            path: "/admin/footer",
            icon: "⚙️"
        }
    ];
    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navbar */}
            <header className="bg-indigo-600 text-white shadow-md">
                <Navbar />
            </header>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 mt-12">
                {/* Sidebar */}
                <aside className="hidden md:block w-72 bg-white shadow-2xl border-r border-slate-200 overflow-y-auto sticky top-12 h-[calc(100vh-3rem)]">
                    {/* Sidebar Header */}
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-indigo-100">
                        <div className="items-center space-x-3">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Admin Panel</h2>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="p-4 space-y-1">
                        {menuStructure.map((item, index) => (
                            <div key={index}>
                                {/* If it has children, make it collapsible */}
                                {item.children ? (
                                    <div className="mb-1">
                                        <button
                                            onClick={() => toggleSection(item.title)}
                                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all duration-200 hover:shadow-sm group"
                                        >
                                            <span className="flex items-center space-x-3">
                                                <span className="text-xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                                                <span className="group-hover:text-indigo-700">{item.title}</span>
                                            </span>
                                            <span className={`text-xs text-slate-400 transition-transform duration-200 ${openSection === item.title ? "rotate-90" : ""
                                                }`}>
                                                ▶
                                            </span>
                                        </button>

                                        {/* Submenu with smooth animation */}
                                        <div className={`overflow-hidden transition-all duration-300 ${openSection === item.title ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                            }`}>
                                            <div className="ml-8 mt-1 space-y-1 border-l-2 border-indigo-200 pl-4 py-2">
                                                {item.children.map((child, childIndex) => (
                                                    <NavLink
                                                        key={childIndex}
                                                        to={child.path}
                                                        className={({ isActive }) =>
                                                            `block px-4 py-2 text-sm rounded-lg transition-all duration-200 ${isActive
                                                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md transform scale-105"
                                                                : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 hover:translate-x-1"
                                                            }`
                                                        }
                                                    >
                                                        <span className="flex items-center">
                                                            <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
                                                            {child.label}
                                                        </span>
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Direct link (no children)
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center space-x-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 mb-1 group ${isActive
                                                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105"
                                                : "text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:shadow-sm hover:translate-x-1"
                                            }`
                                        }
                                    >
                                        <span className="text-xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                                        <span>{item.title}</span>
                                    </NavLink>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
                        <button className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                            <span>🚪</span>
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className=" mx-auto">
                        {/* Content Card Wrapper */}
                        <div className=" p-2">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}