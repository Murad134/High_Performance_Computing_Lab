// import React from 'react'
// import { NavLink } from 'react-router-dom'

// function LeftAsideMember() {
//   const baseClasses =
//     "flex-1 py-2 md:py-3 text-center bg-white transition-colors duration-200"

//   return (
//     <div className="w-full bg-gray-100 border-t border-gray-300">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex divide-x divide-gray-300 border-x border-gray-300 text-sm md:text-base font-semibold text-gray-700 rounded-lg overflow-hidden">
//           <NavLink
//             to="student/bsc"
//             className={({ isActive }) =>
//               `${baseClasses} ${isActive ? "bg-green-200" : "hover:bg-green-100"}`
//             }
//           >
//             Bsc
//           </NavLink>
//           <NavLink
//             to="student/msc"
//             className={({ isActive }) =>
//               `${baseClasses} ${isActive ? "bg-yellow-200" : "hover:bg-yellow-100"}`
//             }
//           >
//             Msc
//           </NavLink>
//           <NavLink
//             to="student/phd"
//             className={({ isActive }) =>
//               `${baseClasses} ${isActive ? "bg-purple-200" : "hover:bg-purple-100"}`
//             }
//           >
//             Phd
//           </NavLink>
//           <NavLink
//             to="alumni"
//             className={({ isActive }) =>
//               `${baseClasses} ${isActive ? "bg-pink-200" : "hover:bg-pink-100"}`
//             }
//           >
//             Alumni
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default LeftAsideMember

import React from 'react'
import { NavLink } from 'react-router-dom'

function LeftAsideMember() {
  const baseClasses =
    "flex-1 py-2 md:py-3 text-center transition-colors duration-200 font-semibold"

  return (
    <div className="w-full bg-gray-100 border-t border-gray-300">
      <div className="w-full mx-auto px-4">
        <div className="flex divide-x divide-gray-300 border-x border-gray-300 text-sm md:text-base rounded-lg overflow-hidden">

          <NavLink
            to="student/bsc"
            className={({ isActive }) =>
              `${baseClasses} text-gray-800 ${isActive
                ? "bg-red-300 text-white"   // Selected / Active
                : "bg-white hover:bg-red-100" // Default + Hover
              }`
            }
          >
            Bsc
          </NavLink>

          <NavLink
            to="student/msc"
            className={({ isActive }) =>
              `${baseClasses} text-gray-800 ${isActive
                ? "bg-red-300 text-white"
                : "bg-white hover:bg-red-100"
              }`
            }
          >
            Msc
          </NavLink>

          <NavLink
            to="student/phd"
            className={({ isActive }) =>
              `${baseClasses} text-gray-800 ${isActive
                ? "bg-red-300 text-white"
                : "bg-white hover:bg-red-100"
              }`
            }
          >
            Phd
          </NavLink>

          <NavLink
            to="alumni"
            className={({ isActive }) =>
              `${baseClasses} text-gray-800 ${isActive
                ? "bg-red-300 text-white"
                : "bg-white hover:bg-red-100"
              }`
            }
          >
            Alumni
          </NavLink>

        </div>
      </div>
    </div>
  )
}

export default LeftAsideMember
