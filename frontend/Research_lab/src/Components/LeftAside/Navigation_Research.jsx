// import { NavLink } from "react-router-dom";

// function NavigationResearch({ navigation }) {
//   return (
//     <aside className="w-80 bg-base-100 shadow-xl min-h-screen sticky top-16 overflow-y-auto">
//       <div className="p-8">
//         <h2 className="text-2xl font-bold text-primary mb-8">
//           Research Navigation
//         </h2>

//         {/* Tree Container */}
//         <div className="relative pl-4">
//           {/* Main Vertical Line */}
//           <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-700" />

//           {/* Navigation Items */}
//           <div className="ml-0 space-y-6">
//             {navigation.map((item) => (
//               <div key={item.id} className="relative flex items-center">
                
//                 {/* Circle ON main vertical line */}
//                 <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-red-700 z-10" />

//                 {/* Horizontal line from circle */}
//                 <div className="absolute left-2 w-6 h-0.5 bg-red-700" />

//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `ml-10 text-lg transition-all
//                     ${
//                       isActive
//                         ? "text-secondary font-semibold scale-105"
//                         : "text-base-content hover:text-secondary"
//                     }`
//                   }
//                 >
//                   {item.title}
//                 </NavLink>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }
// export default NavigationResearch;




import { NavLink } from "react-router-dom";

function NavigationResearch({ navigation }) {
  return (
    <aside className="w-80   min-h-screen sticky top-16 overflow-y-auto">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-primary mb-8">
          Research Navigation
        </h2>

        {/* Tree Container */}
        <div className="relative pl-4">
          {/* Main Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-700" />

          {/* Navigation Items */}
          <div className="ml-0 space-y-6">
            {navigation.map((item) => (
              <div key={item.id} className="relative flex items-center">
                
                {/* Circle ON main vertical line */}
                <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-red-700 z-10" />

                {/* Horizontal line from circle */}
                <div className="absolute left-2 w-6 h-0.5 bg-red-700" />

                <NavLink
                  to={`/research${item.path}`}
                  className={({ isActive }) =>
                    `ml-10 text-lg transition-all
                    ${
                      isActive
                        ? "text-secondary font-semibold scale-105"
                        : "text-base-content hover:text-secondary"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default NavigationResearch;

