import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
export default function AdminLayout() {
    const navItems = [
        { to: "/admin", label: "Dashboard" },
        { to: "/admin/edithome", label: "Edit Home" },
        { to: "/admin/editaboutpro", label: "Edit About Lab" },
        { to: "/admin/editaboutlab", label: "Edit About Professor" },
        { to: "/admin/editcontact", label: "Edit Contact" },
        { to: "/admin/editmember", label: "Edit Member" },
        { to: "/admin/editpublication", label: "Edit Publication" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navbar */}
            <header className="bg-indigo-600 text-white shadow-md">
                <Navbar></Navbar>
            </header>

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 mt-12">
                {/* Sidebar */}
                <aside className="hidden md:block w-64 bg-indigo-50 shadow-md border-r border-indigo-200 p-6">
                    <h2 className="mb-6 text-xl font-bold text-indigo-700">Profile</h2>
                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 border ${isActive
                                        ? "bg-indigo-100 border-indigo-400 text-indigo-900"
                                        : "border-transparent text-gray-700 hover:bg-indigo-200 hover:border-indigo-400 hover:text-indigo-800"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="mt-10">
                        <button className="w-full mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition">
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
