import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ChevronDown, ChevronRight, GraduationCap, BookOpen, Users, Settings, BarChart3 } from "lucide-react";
import Navbar from "../Components/Navbar.jsx";
import useUserRole from "../hooks/useUserRole.jsx";
export default function AdminLayout() {


    const { role } = useUserRole();

    console.log("AdminLayout Role:", role);
    // Debugging line to check the role value
    const [openSection, setOpenSection] = useState(null);
    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };
    const menuStructure = [
        {
            title: "Dashboard",
            path: "/admin",
            icon: BarChart3,
            color: "from-teal-500 to-blue-600"
        },
        {
            title: "Information",
            icon: BookOpen,
            color: "from-blue-500 to-indigo-600",
            children: [
                { label: "Home", path: "/admin/information/home" },
                { label: "Image", path: "/admin/information/image" }
            ]
        },
        {
            title: "About",
            icon: GraduationCap,
            color: "from-indigo-500 to-purple-600",
            children: [
                { label: "About Lab", path: "/admin/about/lab" },
                { label: "About Professor", path: "/admin/about/professor" },
                { label: "Research Interest", path: "/admin/about/research-interest" }
            ]
        },
        {
            title: "Research",
            icon: Users,
            color: "from-purple-500 to-pink-600",
            children: [
                { label: "Departments", path: "/admin/research/departments" },
                { label: "Teams", path: "/admin/research/teams" },
            ]
        },
        {
            title: "Publication",
            icon: BookOpen,
            color: "from-pink-500 to-red-600",
            children: [
                { label: "Journal", path: "/admin/publication/journal" },
                { label: "Conferences", path: "/admin/publication/conferences" },
                { label: "Book Chapter", path: "/admin/publication/book-chapter" }
            ]
        },
        {
            title: "Members",
            path: "/admin/members",
            icon: Users,
            color: "from-green-500 to-teal-600"
        },
        {
            title: "Contacts",
            path: "/admin/contacts",
            icon: Settings,
            color: "from-teal-500 to-cyan-600"
        },
        {
            title: "Footer",
            path: "/admin/footer",
            icon: Settings,
            color: "from-cyan-500 to-blue-600"
        },
        ...(role === 'superadmin' ? [
            {
                title: 'Make Admin',
                path: '/admin/make-admin',
                icon: GraduationCap,
                color: "from-yellow-500 to-orange-600"
            }
        ] : [])

    ];
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-teal-50/40 font-poppins">
            {/* Custom Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes slideIn {
                        from { transform: translateX(-20px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes fadeInUp {
                        from { transform: translateY(20px); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    .animate-slide-in {
                        animation: slideIn 0.3s ease-out forwards;
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 0.4s ease-out forwards;
                    }
                `
            }} />

            {/* Top Navbar */}
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 mt-12">
                {/* Premium Academic Sidebar */}
                <aside className="hidden md:block w-80 bg-white shadow-2xl border-r border-teal-100/50 overflow-y-auto sticky top-12 h-[calc(100vh-3rem)]">
                    {/* Sidebar Header - Enhanced */}
                    <div className="relative p-8 bg-gradient-to-r from-white via-teal-50/50 to-blue-50/30 border-b border-teal-100/50 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400 to-teal-500 rounded-full blur-xl"></div>
                        </div>

                        <div className="relative flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-teal-800 bg-clip-text text-transparent">
                                    Admin Portal
                                </h2>
                                <p className="text-sm text-teal-600 font-medium">Research Lab Management</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu - Premium Design */}
                    <nav className="p-6 space-y-3">
                        {menuStructure.map((item, index) => (
                            <div key={index} className="animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                                {/* If it has children, make it collapsible */}
                                {item.children ? (
                                    <div className="mb-2">
                                        <button
                                            onClick={() => toggleSection(item.title)}
                                            className="w-full group relative bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl hover:border-teal-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                        >
                                            {/* Background Gradient on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-teal-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className="relative flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                                                        <item.icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-xs text-gray-500 group-hover:text-teal-600 transition-colors">
                                                            {item.children.length} sections
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-teal-500 group-hover:text-teal-700 transition-all duration-300">
                                                    {openSection === item.title ?
                                                        <ChevronDown className="w-5 h-5" /> :
                                                        <ChevronRight className="w-5 h-5" />
                                                    }
                                                </div>
                                            </div>

                                            {/* Bottom Accent */}
                                            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                                        </button>

                                        {/* Enhanced Submenu */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSection === item.title ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                                            <div className="ml-6 space-y-2">
                                                {item.children.map((child, childIndex) => (
                                                    <NavLink
                                                        key={childIndex}
                                                        to={child.path}
                                                        className={({ isActive }) => {
                                                            const baseClasses = "group/item flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 hover:shadow-md";
                                                            const activeClasses = `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105 border-transparent`;
                                                            const inactiveClasses = "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 border-gray-100 hover:border-teal-200 hover:translate-x-2";
                                                            return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
                                                        }}
                                                        style={{animationDelay: `${(index * 100) + (childIndex * 50)}ms`}}
                                                    >
                                                        {({ isActive }) => (
                                                            <>
                                                                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                                    isActive ? "bg-white" : "bg-teal-400 group-hover/item:bg-teal-600"
                                                                }`}></div>
                                                                <span className="font-medium">{child.label}</span>
                                                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                                            </>
                                                        )}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Direct link (no children) - Enhanced
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => {
                                            const baseClasses = "group relative flex items-center gap-4 p-4 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden";
                                            const activeClasses = `bg-gradient-to-r ${item.color} text-white border-transparent shadow-xl transform scale-105`;
                                            const inactiveClasses = "bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-700 border-gray-100 hover:border-teal-200";
                                            return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
                                        }}
                                        style={{animationDelay: `${index * 100}ms`}}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {/* Background Gradient on Hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-teal-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 relative`}>
                                                    <item.icon className="w-6 h-6 text-white" />
                                                    {isActive && (
                                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-current"></div>
                                                    )}
                                                </div>

                                                <div className="flex-1 relative">
                                                    <h3 className={`font-semibold transition-colors ${
                                                        isActive ? "text-white" : "text-gray-900 group-hover:text-teal-700"
                                                    }`}>
                                                        {item.title}
                                                    </h3>
                                                    <p className={`text-xs transition-colors ${
                                                        isActive ? "text-blue-100" : "text-gray-500 group-hover:text-teal-600"
                                                    }`}>
                                                        {item.title === 'Dashboard' ? 'Overview & Analytics' :
                                                         item.title === 'Members' ? 'Team Management' :
                                                         item.title === 'Contacts' ? 'Communication' :
                                                         item.title === 'Footer' ? 'Site Configuration' :
                                                         item.title === 'Make Admin' ? 'Super Admin Tools' : 'Management'}
                                                    </p>
                                                </div>

                                                {/* Bottom Accent */}
                                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                                            </>
                                        )}
                                    </NavLink>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-6 border-t border-teal-100/50 bg-gradient-to-r from-teal-50/30 to-blue-50/30">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 font-medium">High Performance Computing Lab</p>
                            <p className="text-xs text-teal-600 mt-1">Academic Research Portal</p>
                        </div>
                    </div>
                </aside>

                {/* Premium Main Content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/10 to-teal-50/20 py-8 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Content Card Wrapper - Enhanced */}
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 min-h-[calc(100vh-8rem)]">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400 to-teal-500 rounded-full blur-2xl"></div>
                            </div>

                            <div className="relative animate-fade-in-up">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}