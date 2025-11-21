import React from 'react'
import { NavLink, Link } from 'react-router-dom'
function Header() {
    const Links = (
        <>
            <li>
                <NavLink
                    to="/"
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
                <details>
                    <summary>Publication</summary>
                    <ul className="p-2 bg-white shadow-md rounded-md">
                        <li>
                            <NavLink
                                to="/publication/thesis"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-500 underline font-semibold"
                                        : "text-gray-800 hover:text-red-400 transition"
                                }
                            >
                                Thesis
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/publication/projects"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-red-500 underline font-semibold"
                                        : "text-gray-800 hover:text-red-400 transition"
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
                    className={({ isActive }) =>
                        isActive
                            ? "text-red-500 underline font-semibold"
                            : "hover:text-red-400 transition"
                    }
                >
                    Admin Panel
                </NavLink>
            </li>
        </>
    );
    return (

        <div className="fixed top-0 left-0 w-full z-50">
            <div className="navbar bg-gradient-to-r bg-blue-600  shadow-md text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden text-white hover:bg-white/20 transition"
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
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
                        >
                            {Links}
                        </ul>
                    </div>
                    <a className="p-2 ml-2 text-2xl font-extrabold  text-white">
                        HPC LAB
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white font-medium">
                        {Links}
                    </ul>
                </div>

                <div className="navbar-end">
                    <button>
                        <Link
                            to="/auth/login"
                            className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-md transition"
                        >
                            Login
                        </Link>
                    </button>
                </div>
            </div>
        </div>

    )
}
export default Header