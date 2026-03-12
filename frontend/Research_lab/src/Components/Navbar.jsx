// import React, { useState, useEffect, useRef } from 'react'
// import { NavLink, Link } from 'react-router-dom'

// import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import useUserRole from '../hooks/useUserRole';
// function Header() {

//     const { role, isLoading } = useUserRole();

//     const { user, signout } = useAuth();
//     const navigate = useNavigate();

//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//     const [isSupervisionsOpen, setIsSupervisionsOpen] = useState(false);
//     const [isResearchOpen, setIsResearchOpen] = useState(false);
//     // Desktop dropdown refs
//     const researchDropdownRef = useRef(null);
//     const supervisionsDropdownRef = useRef(null);

//     // Auto-close timer refs
//     const researchTimerRef = useRef(null);
//     const supervisionsTimerRef = useRef(null);
//     // Drawer close করার function (Mobile)
//     const closeDrawer = () => {
//         setIsDrawerOpen(false);
//         setIsSupervisionsOpen(false);
//         setIsResearchOpen(false);
//     };
//     // Desktop dropdown close করার function
//     const closeAllDropdowns = () => {
//         const allDetails = document.querySelectorAll('details[open]');
//         allDetails.forEach(detail => detail.removeAttribute('open'));

//         // Clear timers
//         if (researchTimerRef.current) clearTimeout(researchTimerRef.current);
//         if (supervisionsTimerRef.current) clearTimeout(supervisionsTimerRef.current);
//     };
//     // Start auto-close timer
//     const startAutoCloseTimer = (dropdownType) => {
//         const timerRef = dropdownType === 'research' ? researchTimerRef : supervisionsTimerRef;
//         // Clear existing timer
//         if (timerRef.current) clearTimeout(timerRef.current);
//         // Set new 30-second timer
//         timerRef.current = setTimeout(() => {
//             closeAllDropdowns();
//         }, 30000); // 30 seconds
//     };
//     // Handle click outside navbar to close dropdowns
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             const navbar = document.querySelector('.navbar');
//             if (navbar && !navbar.contains(event.target)) {
//                 closeAllDropdowns();
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//             // Cleanup timers
//             if (researchTimerRef.current) clearTimeout(researchTimerRef.current);
//             if (supervisionsTimerRef.current) clearTimeout(supervisionsTimerRef.current);
//         };
//     }, []);
//     // Handle dropdown open/close with timer
//     const handleDropdownToggle = (dropdownType, event) => {
//         const currentDetail = event.currentTarget;
//         const isOpening = currentDetail.hasAttribute('open');

//         if (isOpening) {
//             // Close all other dropdowns
//             const allDetails = document.querySelectorAll('details');
//             allDetails.forEach(detail => {
//                 if (detail !== currentDetail && detail.hasAttribute('open')) {
//                     detail.removeAttribute('open');
//                 }
//             });

//             // Start auto-close timer for newly opened dropdown
//             startAutoCloseTimer(dropdownType);
//         }
//     };

//     return (
//         <>
//             {/* Overlay - Drawer খোলা থাকলে background dark */}
//             {isDrawerOpen && (
//                 <div
//                     className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//                     onClick={closeDrawer}
//                 />
//             )}
//             {/* Main Navbar */}
//             <div className="fixed top-0 left-0 w-full z-50">
//                 <div className="navbar bg-gradient-to-r bg-blue-600 shadow-md text-white px-4">
//                     {/* Left Side - Menu Button & Logo */}
//                     <div className="navbar-start">
//                         {/* Hamburger Menu Button (Mobile/Tablet only) */}
//                         <button
//                             className="btn btn-ghost lg:hidden text-white hover:bg-white/20 transition"
//                             onClick={() => setIsDrawerOpen(true)}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </button>
//                         {/* Logo */}
//                         <Link
//                             to="/"
//                             onClick={closeAllDropdowns}
//                             className="ml-2 text-xl md:text-2xl font-extrabold text-white hover:text-yellow-300 transition"
//                         >
//                             HPC LAB
//                         </Link>
//                     </div>
//                     {/* Center - Desktop Menu */}
//                     <div className="navbar-center hidden lg:flex">
//                         <ul className="menu menu-horizontal px-1 text-white font-medium">
//                             <li>
//                                 <NavLink
//                                     to="/"
//                                     onClick={closeAllDropdowns}
//                                     className={({ isActive }) =>
//                                         isActive
//                                             ? "text-red-500 underline font-semibold"
//                                             : "hover:text-red-400 transition"
//                                     }
//                                 >
//                                     Home
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     to="/about"
//                                     onClick={closeAllDropdowns}
//                                     className={({ isActive }) =>
//                                         isActive
//                                             ? "text-red-500 underline font-semibold"
//                                             : "hover:text-red-400 transition"
//                                     }
//                                 >
//                                     About
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <details
//                                     ref={researchDropdownRef}
//                                     onToggle={(e) => handleDropdownToggle('Research', e)}
//                                 >
//                                     <summary className="cursor-pointer">Research</summary>
//                                     <ul className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded-md w-40 z-50">
//                                         <li>
//                                             <NavLink
//                                                 to="/research/researchs/departments"
//                                                 onClick={closeAllDropdowns}
//                                                 className={({ isActive }) =>
//                                                     isActive
//                                                         ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
//                                                         : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
//                                                 }
//                                             >
//                                                 Researchs
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink
//                                                 to="/research/publications"
//                                                 onClick={closeAllDropdowns}
//                                                 className={({ isActive }) =>
//                                                     isActive
//                                                         ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
//                                                         : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
//                                                 }
//                                             >
//                                                 Publications
//                                             </NavLink>
//                                         </li>
//                                     </ul>
//                                 </details>
//                             </li>
//                             <li>
//                                 <details
//                                     ref={supervisionsDropdownRef}
//                                     onToggle={(e) => handleDropdownToggle('Supervisons', e)}
//                                 >
//                                     <summary className="cursor-pointer">Supervisons</summary>
//                                     <ul className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded-md w-40 z-50">
//                                         <li>
//                                             <NavLink
//                                                 to="/supervison/thesis"
//                                                 onClick={closeAllDropdowns}
//                                                 className={({ isActive }) =>
//                                                     isActive
//                                                         ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
//                                                         : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
//                                                 }
//                                             >
//                                                 Academic Thesis
//                                             </NavLink>
//                                         </li>
//                                         <li>
//                                             <NavLink
//                                                 to="/supervison/projects"
//                                                 onClick={closeAllDropdowns}
//                                                 className={({ isActive }) =>
//                                                     isActive
//                                                         ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
//                                                         : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
//                                                 }
//                                             >
//                                                 Academic Projects
//                                             </NavLink>
//                                         </li>
//                                     </ul>
//                                 </details>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     to="/member"
//                                     onClick={closeAllDropdowns}
//                                     className={({ isActive }) =>
//                                         isActive
//                                             ? "text-red-500 underline font-semibold"
//                                             : "hover:text-red-400 transition"
//                                     }
//                                 >
//                                     Member
//                                 </NavLink>
//                             </li>
//                             <li>
//                                 <NavLink
//                                     to="/contact"
//                                     onClick={closeAllDropdowns}
//                                     className={({ isActive }) =>
//                                         isActive
//                                             ? "text-red-500 underline font-semibold"
//                                             : "hover:text-red-400 transition"
//                                     }
//                                 >
//                                     Contact
//                                 </NavLink>
//                             </li>


//                             {/* Admin Panel Link */}
//                             {!isLoading && role === 'admin' &&
//                                 <>
//                                     <li>
//                                         <NavLink
//                                             to="/admin"
//                                             onClick={closeAllDropdowns}
//                                             className={({ isActive }) =>
//                                                 isActive
//                                                     ? "text-red-500 underline font-semibold"
//                                                     : "hover:text-red-400 transition"
//                                             }
//                                         >
//                                             Admin Panel
//                                         </NavLink>
//                                     </li>
//                                 </>
//                             }
//                         </ul>
//                     </div>

//                     {/* Right Side - Login Button */}
//                     <div className="navbar-end">
//                         {user ? (
//                             <button
//                                 onClick={async () => {
//                                     await signout(); // log the user out
//                                     closeAllDropdowns();
//                                     navigate('/auth/login'); // redirect to login after logout
//                                 }}
//                                 className="btn btn-sm md:btn-md bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md transition border-none px-2"
//                             >
//                                 Logout
//                             </button>
//                         ) : (
//                             <Link
//                                 to="/auth/login"
//                                 onClick={closeAllDropdowns}
//                                 className="btn btn-sm md:btn-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-md transition border-none px-2"
//                             >
//                                 Login
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </div >

//             {/* Side Drawer (Mobile/Tablet) - Slides from LEFT */}
//             < div
//                 className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
//                     }`
//                 }
//             >
//                 {/* Drawer Header */}
//                 < div className="flex items-center justify-between p-4 bg-blue-600 text-white" >
//                     <h2 className="text-xl font-bold">Menu</h2>
//                     <button
//                         onClick={closeDrawer}
//                         className="btn btn-ghost btn-sm text-white hover:bg-white/20"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div >

//                 {/* Drawer Menu Items */}
//                 < ul className="menu p-4 text-gray-800 space-y-2" >
//                     <li>
//                         <NavLink
//                             to="/"
//                             onClick={closeDrawer}
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "bg-red-100 text-red-600 font-semibold rounded-lg"
//                                     : "hover:bg-gray-100 transition rounded-lg"
//                             }
//                         >
//                             🏠 Home
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             to="/about"
//                             onClick={closeDrawer}
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "bg-red-100 text-red-600 font-semibold rounded-lg"
//                                     : "hover:bg-gray-100 transition rounded-lg"
//                             }
//                         >
//                             ℹ️ About
//                         </NavLink>
//                     </li>
//                     <li>
//                         <button
//                             onClick={() => setIsResearchOpen(!isResearchOpen)}
//                             className="w-full text-left flex items-center justify-between hover:bg-gray-100 transition rounded-lg px-4 py-2"
//                         >
//                             📚 Research
//                             <svg
//                                 className={`w-4 h-4 transition-transform ${isResearchOpen ? 'rotate-180' : ''}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                         {isResearchOpen && (
//                             <ul className="ml-6 mt-2 space-y-1">
//                                 <li>
//                                     <NavLink
//                                         to="/research/researchs/departments"
//                                         onClick={closeDrawer}
//                                         className={({ isActive }) =>
//                                             isActive
//                                                 ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
//                                                 : "block py-2 px-3 hover:bg-gray-100 transition rounded"
//                                         }
//                                     >
//                                         📄 Researchs
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/research/publications"
//                                         onClick={closeDrawer}
//                                         className={({ isActive }) =>
//                                             isActive
//                                                 ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
//                                                 : "block py-2 px-3 hover:bg-gray-100 transition rounded"
//                                         }
//                                     >
//                                         📄 Publications
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>

//                     {/* Supervison Submenu */}
//                     <li>
//                         <button
//                             onClick={() => setIsSupervisionsOpen(!isSupervisionsOpen)}
//                             className="w-full text-left flex items-center justify-between hover:bg-gray-100 transition rounded-lg px-4 py-2"
//                         >
//                             📚 Supervisons
//                             <svg
//                                 className={`w-4 h-4 transition-transform ${isSupervisionsOpen ? 'rotate-180' : ''}`}
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                         {isSupervisionsOpen && (
//                             <ul className="ml-6 mt-2 space-y-1">
//                                 <li>
//                                     <NavLink
//                                         to="/supervison/thesis"
//                                         onClick={closeDrawer}
//                                         className={({ isActive }) =>
//                                             isActive
//                                                 ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
//                                                 : "block py-2 px-3 hover:bg-gray-100 transition rounded"
//                                         }
//                                     >
//                                         📄Academic Thesis
//                                     </NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink
//                                         to="/supervison/projects"
//                                         onClick={closeDrawer}
//                                         className={({ isActive }) =>
//                                             isActive
//                                                 ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
//                                                 : "block py-2 px-3 hover:bg-gray-100 transition rounded"
//                                         }
//                                     >
//                                         💼Academic Projects
//                                     </NavLink>
//                                 </li>
//                             </ul>
//                         )}
//                     </li>

//                     <li>
//                         <NavLink
//                             to="/member"
//                             onClick={closeDrawer}
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "bg-red-100 text-red-600 font-semibold rounded-lg"
//                                     : "hover:bg-gray-100 transition rounded-lg"
//                             }
//                         >
//                             👥 Member
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink
//                             to="/contact"
//                             onClick={closeDrawer}
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? "bg-red-100 text-red-600 font-semibold rounded-lg"
//                                     : "hover:bg-gray-100 transition rounded-lg"
//                             }
//                         >
//                             📞 Contact
//                         </NavLink>
//                         {/* Admin Panel Link */}
//                     </li>
//                     {
//                         !isLoading && role === 'admin' &&
//                         <>
//                             <li>
//                                 <NavLink
//                                     to="/admin"
//                                     onClick={closeDrawer}
//                                     className={({ isActive }) =>
//                                         isActive
//                                             ? "bg-red-100 text-red-600 font-semibold rounded-lg"
//                                             : "hover:bg-gray-100 transition rounded-lg"
//                                     }
//                                 >
//                                     ⚙️ Admin Panel
//                                 </NavLink>
//                             </li>
//                         </>
//                     }

//                 </ul >
//             </div >
//         </>
//     )
// }
// export default Header




import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'

import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useUserRole from '../hooks/useUserRole';
function Header() {

    const { role, isLoading } = useUserRole();

    const { user, signout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSupervisionsOpen, setIsSupervisionsOpen] = useState(false);
    const [isResearchOpen, setIsResearchOpen] = useState(false);
    // Desktop dropdown refs
    const researchDropdownRef = useRef(null);
    const supervisionsDropdownRef = useRef(null);

    // Auto-close timer refs
    const researchTimerRef = useRef(null);
    const supervisionsTimerRef = useRef(null);
    // Drawer close করার function (Mobile)
    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setIsSupervisionsOpen(false);
        setIsResearchOpen(false);
    };
    // Desktop dropdown close করার function
    const closeAllDropdowns = () => {
        const allDetails = document.querySelectorAll('details[open]');
        allDetails.forEach(detail => detail.removeAttribute('open'));

        // Clear timers
        if (researchTimerRef.current) clearTimeout(researchTimerRef.current);
        if (supervisionsTimerRef.current) clearTimeout(supervisionsTimerRef.current);
    };
    // Start auto-close timer
    const startAutoCloseTimer = (dropdownType) => {
        const timerRef = dropdownType === 'research' ? researchTimerRef : supervisionsTimerRef;
        // Clear existing timer
        if (timerRef.current) clearTimeout(timerRef.current);
        // Set new 30-second timer
        timerRef.current = setTimeout(() => {
            closeAllDropdowns();
        }, 30000); // 30 seconds
    };


    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Auto close after 5 seconds
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [open]);


    // Handle click outside navbar to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            const navbar = document.querySelector('.navbar');
            if (navbar && !navbar.contains(event.target)) {
                closeAllDropdowns();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // Cleanup timers
            if (researchTimerRef.current) clearTimeout(researchTimerRef.current);
            if (supervisionsTimerRef.current) clearTimeout(supervisionsTimerRef.current);
        };
    }, []);
    // Handle dropdown open/close with timer
    const handleDropdownToggle = (dropdownType, event) => {
        const currentDetail = event.currentTarget;
        const isOpening = currentDetail.hasAttribute('open');

        if (isOpening) {
            // Close all other dropdowns
            const allDetails = document.querySelectorAll('details');
            allDetails.forEach(detail => {
                if (detail !== currentDetail && detail.hasAttribute('open')) {
                    detail.removeAttribute('open');
                }
            });

            // Start auto-close timer for newly opened dropdown
            startAutoCloseTimer(dropdownType);
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
                            onClick={closeAllDropdowns}
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
                                    onClick={closeAllDropdowns}
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
                                    onClick={closeAllDropdowns}
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
                                <details
                                    ref={researchDropdownRef}
                                    onToggle={(e) => handleDropdownToggle('Research', e)}
                                >
                                    <summary className="cursor-pointer">Research</summary>
                                    <ul className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded-md w-40 z-50">
                                        <li>
                                            <NavLink
                                                to="/research/researchs/departments"
                                                onClick={closeAllDropdowns}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
                                                        : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
                                                }
                                            >
                                                Researchs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/research/publications"
                                                onClick={closeAllDropdowns}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
                                                        : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
                                                }
                                            >
                                                Publications
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <details
                                    ref={supervisionsDropdownRef}
                                    onToggle={(e) => handleDropdownToggle('Supervisons', e)}
                                >
                                    <summary className="cursor-pointer">Supervisons</summary>
                                    <ul className="absolute left-0 mt-2 p-2 bg-white shadow-lg rounded-md w-40 z-50">
                                        <li>
                                            <NavLink
                                                to="/supervison/thesis"
                                                onClick={closeAllDropdowns}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
                                                        : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
                                                }
                                            >
                                                Academic Thesis
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to="/supervison/projects"
                                                onClick={closeAllDropdowns}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "block px-3 py-2 text-red-500 underline font-semibold rounded"
                                                        : "block px-3 py-2 text-gray-800 hover:bg-red-50 hover:text-red-400 transition rounded"
                                                }
                                            >
                                                Academic Projects
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <NavLink
                                    to="/member"
                                    onClick={closeAllDropdowns}
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
                                    onClick={closeAllDropdowns}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-red-500 underline font-semibold"
                                            : "hover:text-red-400 transition"
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>


                            {/* Admin Panel Link */}
                            {!isLoading && role === 'admin' &&
                                <>
                                    <li>
                                        <NavLink
                                            to="/admin"
                                            onClick={closeAllDropdowns}
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
                            }
                        </ul>
                    </div>

                    {/* Right Side - Login Button */}

                    {/* <div className="navbar-end">
                        <div className="relative" ref={menuRef}>
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <img
                                    src={user?.photoURL}
                                    alt="user"
                                    className="w-9 h-9 rounded-full border-2 border-white"
                                />

                                <span className="hidden md:block text-white font-semibold">
                                    {user?.displayName}
                                </span>
                            </div>

                            {open && (
                                <div className="absolute right-0 mt-3 min-w-[140px] w-auto bg-white text-black rounded-xl shadow-lg p-2 animate-fadeIn">

                                    <p className="md:hidden font-semibold px-2 py-1">
                                        {user?.displayName}
                                    </p>

                                    <button
                                        onClick={async () => {
                                            await signout();
                                            navigate("/auth/login");
                                            setOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 font-medium transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div> */}


                    <div className="navbar-end">
                        {!user ? (
                            /* ================= Login Button ================= */
                            <button
                                onClick={() => navigate("/auth/login")}
                                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                            >
                                Login
                            </button>
                        ) : (
                            /* ================= Avatar Menu ================= */
                            <div className="relative" ref={menuRef}>
                                {/* Avatar Button */}
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                        alt="user"
                                        className="w-9 h-9 rounded-full border-2 border-white"
                                    />

                                    {/* Desktop Name */}
                                    <span className="hidden md:block text-white font-semibold">
                                        {user?.displayName || "User"}
                                    </span>
                                </div>

                                {/* Dropdown */}
                                {open && (
                                    <div className="absolute right-0 mt-3 min-w-[150px] bg-white text-black rounded-xl shadow-lg p-2 animate-fadeIn">

                                        {/* Mobile Name */}
                                        <p className="md:hidden font-semibold px-2 py-1">
                                            {user?.displayName}
                                        </p>

                                        <button
                                            onClick={async () => {
                                                await signout();
                                                navigate("/auth/login");
                                                setOpen(false);
                                            }}
                                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 font-medium transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>


                </div>
            </div >

            {/* Side Drawer (Mobile/Tablet) - Slides from LEFT */}
            < div
                className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    }`
                }
            >
                {/* Drawer Header */}
                < div className="flex items-center justify-between p-4 bg-blue-600 text-white" >
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
                </div >

                {/* Drawer Menu Items */}
                < ul className="menu p-4 text-gray-800 space-y-2" >
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
                        <button
                            onClick={() => setIsResearchOpen(!isResearchOpen)}
                            className="w-full text-left flex items-center justify-between hover:bg-gray-100 transition rounded-lg px-4 py-2"
                        >
                            📚 Research
                            <svg
                                className={`w-4 h-4 transition-transform ${isResearchOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isResearchOpen && (
                            <ul className="ml-6 mt-2 space-y-1">
                                <li>
                                    <NavLink
                                        to="/research/researchs/departments"
                                        onClick={closeDrawer}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
                                                : "block py-2 px-3 hover:bg-gray-100 transition rounded"
                                        }
                                    >
                                        📄 Researchs
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/research/publications"
                                        onClick={closeDrawer}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
                                                : "block py-2 px-3 hover:bg-gray-100 transition rounded"
                                        }
                                    >
                                        📄 Publications
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Supervison Submenu */}
                    <li>
                        <button
                            onClick={() => setIsSupervisionsOpen(!isSupervisionsOpen)}
                            className="w-full text-left flex items-center justify-between hover:bg-gray-100 transition rounded-lg px-4 py-2"
                        >
                            📚 Supervisons
                            <svg
                                className={`w-4 h-4 transition-transform ${isSupervisionsOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {isSupervisionsOpen && (
                            <ul className="ml-6 mt-2 space-y-1">
                                <li>
                                    <NavLink
                                        to="/supervison/thesis"
                                        onClick={closeDrawer}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
                                                : "block py-2 px-3 hover:bg-gray-100 transition rounded"
                                        }
                                    >
                                        📄Academic Thesis
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/supervison/projects"
                                        onClick={closeDrawer}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 bg-red-100 text-red-600 font-semibold rounded"
                                                : "block py-2 px-3 hover:bg-gray-100 transition rounded"
                                        }
                                    >
                                        💼Academic Projects
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
                        {/* Admin Panel Link */}
                    </li>
                    {
                        !isLoading && role === 'admin' &&
                        <>
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
                        </>
                    }

                </ul >
            </div >
        </>
    )
}
export default Header