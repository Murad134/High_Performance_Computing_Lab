import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isPublicationOpen, setIsPublicationOpen] = useState(false);

    // Drawer close করার function (Mobile)
    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setIsPublicationOpen(false);
    };

    // Dropdown close করার function (Desktop)
    const closeDropdown = () => {
        const details = document.querySelector('details');
        if (details) {
            details.removeAttribute('open');
        }
    };

    return (
        <>
            {/* Overlay - Drawer খোলা থাকলে background dark */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeDrawer}
                />
            )}

            {/* Main Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <div className="navbar bg-gradient-to-r bg-blue-600 shadow-md text-white px-4">
                    {/* Left Side - Menu Button & Logo */}
                    <div className="navbar-start">
                        {/* Hamburger Menu Button (Mobile/Tablet only) */}
                        <button
                            className="btn btn-ghost lg:hidden text-white hover:bg-white/20 transition"
                            onClick={() => setIsDrawerOpen(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <Link
                            to="/"
                            className="ml-2 text-xl md:text-2xl font-extrabold text-white hover:text-yellow-300 transition"
                        >
                            HPC LAB
                        </Link>
                    </div>

                    {/* Center - Desktop Menu */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-white font-medium">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={closeDropdown}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500 underline font-semibold"
                                            : "hover:text-red-400 transition"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    onClick={closeDropdown}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500 underline font-semibold"
                                            : "hover:text-red-400 transition"
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/research"
                                    onClick={closeDropdown}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500 underline font-semibold"
                                            : "hover:text-red-400 transition"
                                    }
                                >
                                    Research
                                </NavLink>
                            </li>
                            <li>
                                <details>
                                    <summary className="cursor-pointer">Publication</summary>
                                    <ul className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded-md w-40 z-50">
                                        <li>
                                            <NavLink
                                                to="/publication/thesis"
                                                onClick={closeDropdown}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
                                                        : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
                                                }
                                            >
                                                Thesis
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/publication/projects"
                                                onClick={closeDropdown}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
                                                        : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
                                                }
                                            >
                                                Projects
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <NavLink
                                    to="/member"
                                    onClick={closeDropdown}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500 underline font-semibold"
                                            : "hover:text-red-400 transition"
                                    }
                                >
                                    Member
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    onClick={closeDropdown}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500 underline font-semibold"
                                            : "hover:text-red-400 transition"
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin"
                                    onClick={closeDropdown}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500 underline font-semibold"
                                            : "hover:text-red-400 transition"
                                    }
                                >
                                    Admin Panel
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Right Side - Login Button */}
                    <div className="navbar-end">
                        <Link
                            to="/auth/login"
                            className="btn btn-sm md:btn-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-md transition border-none"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Side Drawer (Mobile/Tablet) - Slides from LEFT */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button
                        onClick={closeDrawer}
                        className="btn btn-ghost btn-sm text-white hover:bg-white/20"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Drawer Menu Items */}
                <ul className="menu p-4 text-gray-800 space-y-2">
                    <li>
                        <NavLink
                            to="/"
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-red-100 text-red-600 font-semibold rounded-lg"
                                    : "hover:bg-gray-100 transition rounded-lg"
                            }
                        >
                            🏠 Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-red-100 text-red-600 font-semibold rounded-lg"
                                    : "hover:bg-gray-100 transition rounded-lg"
                            }
                        >
                            ℹ️ About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/research"
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-red-100 text-red-600 font-semibold rounded-lg"
                                    : "hover:bg-gray-100 transition rounded-lg"
                            }
                        >
                            🔬 Research
                        </NavLink>
                    </li>

                    {/* Publication Submenu */}
                    <li>
                        <button
                            onClick={() => setIsPublicationOpen(!isPublicationOpen)}
                            className="w-full text-left flex items-center justify-between hover:bg-gray-100 transition rounded-lg px-4 py-2"
                        >
                            📚 Publication
                            <svg
                                className={`w-4 h-4 transition-transform ${isPublicationOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isPublicationOpen && (
                            <ul className="ml-6 mt-2 space-y-1">
                                <li>
                                    <NavLink
                                        to="/publication/thesis"
                                        onClick={closeDrawer}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
                                                : "block py-2 px-3 hover:bg-gray-100 transition rounded"
                                        }
                                    >
                                        📄 Thesis
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/publication/projects"
                                        onClick={closeDrawer}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
                                                : "block py-2 px-3 hover:bg-gray-100 transition rounded"
                                        }
                                    >
                                        💼 Projects
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <NavLink
                            to="/member"
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-red-100 text-red-600 font-semibold rounded-lg"
                                    : "hover:bg-gray-100 transition rounded-lg"
                            }
                        >
                            👥 Member
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-red-100 text-red-600 font-semibold rounded-lg"
                                    : "hover:bg-gray-100 transition rounded-lg"
                            }
                        >
                            📞 Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin"
                            onClick={closeDrawer}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-red-100 text-red-600 font-semibold rounded-lg"
                                    : "hover:bg-gray-100 transition rounded-lg"
                            }
                        >
                            ⚙️ Admin Panel
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Header