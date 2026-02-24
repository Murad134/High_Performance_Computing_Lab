// import React from 'react';
// import { NavLink, useParams } from 'react-router-dom';

// const SECTIONS = [
//   { key: 'bsc', label: 'BSC' },
//   { key: 'msc', label: 'MSC' },
//   { key: 'phd', label: 'PHD' }
// ];

// function LeftSidebar() {
//   const { level } = useParams(); // level = bsc / msc / phd

//   return (
//     <aside className="w-80 min-h-screen sticky top-16 overflow-y-auto">
//       <div className="p-8">
//         <h2 className="text-2xl font-bold text-primary mb-8">Members</h2>

//         <div className="relative pl-4">
//           <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-700"></div>

//           {SECTIONS.map((section) => (
//             <div key={section.key} className="relative mb-8">
//               <div className="absolute left-0 top-6 w-6 h-0.5 bg-blue-700"></div>

//               <div className="ml-6">
//                 {/* Main Level Button */}
//                 <span
//                   className={`text-lg font-bold mb-3 block transition-all ${
//                     level === section.key ? 'text-primary scale-105' : 'text-base-content'
//                   }`}
//                 >
//                   {section.label}
//                 </span>

//                 {/* Sub-items always expanded based on URL */}
//                 {level === section.key && (
//                   <div className="relative ml-4 space-y-2">
//                     <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-700"></div>

//                     <div className="relative">
//                       <div className="absolute text-[16px] left-0 top-3 w-4 h-0.5 bg-red-700"></div>
//                       <NavLink
//                         to={`/member/${section.key}/current`}
//                         className={({ isActive }) =>
//                           `block ml-4 py-1 text-lg transition-all ${
//                             isActive ? 'text-secondary font-semibold scale-105' : 'text-base-content hover:text-secondary'
//                           }`
//                         }
//                       >
//                         Current Students
//                       </NavLink>
//                     </div>

//                     <div className="relative">
//                       <div className="absolute left-0 top-3 w-4 h-0.5 bg-base-300"></div>
//                       <NavLink
//                         to={`/member/${section.key}/alumni`}
//                         className={({ isActive }) =>
//                           `block ml-4 py-1 text-lg transition-all ${
//                             isActive ? 'text-accent font-semibold scale-105' : 'text-base-content hover:text-accent'
//                           }`
//                         }
//                       >
//                         Alumni
//                       </NavLink>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }

// export default LeftSidebar;



import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const SECTIONS = [
  { key: 'bsc', label: 'BSC' },
  { key: 'msc', label: 'MSC' },
  { key: 'phd', label: 'PHD' }
];

function LeftSidebar() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(level || null);

  useEffect(() => {
    if (level) setExpandedSection(level);
  }, [level]);

  const handleSectionClick = (sectionKey) => {
    // Navigate to default 'current' page
    navigate(`/member/${sectionKey}/current`);
    // Expand/collapse accordion
    setExpandedSection(prev => prev === sectionKey ? null : sectionKey);
  };

  return (
    <aside className="w-80 min-h-screen sticky top-16 overflow-y-auto">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-primary mb-8">Members</h2>

        {/* Tree Structure */}
        <div className="relative pl-4">
          {/* Main Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-700"></div>

          {SECTIONS.map((section) => (
            <div key={section.key} className="relative mb-8">
              {/* Horizontal Line */}
              <div className="absolute left-0 top-6 w-6 h-0.5 bg-blue-700"></div>

              {/* Section Content */}
              <div className="ml-6">
                {/* Main Section as Link */}
                <button
                  onClick={() => handleSectionClick(section.key)}
                  className={`text-lg font-bold mb-3 transition-all hover:text-primary ${
                    level === section.key ? 'text-primary scale-105' : 'text-base-content'
                  }`}
                >
                  {section.label}
                </button>

                {/* Sub-items */}
                {expandedSection === section.key && (
                  <div className="relative ml-4 space-y-2">
                    {/* Sub Vertical Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-700"></div>

                    {/* Current Students */}
                    <div className="relative">
                      <div className="absolute text-[16px] left-0 top-3 w-4 h-0.5 bg-red-700"></div>
                      <NavLink
                        to={`/member/${section.key}/current`}
                        className={({ isActive }) =>
                          `block ml-4 py-1 text-lg transition-all ${
                            isActive
                              ? 'text-secondary font-semibold scale-105'
                              : 'text-base-content hover:text-secondary'
                          }`
                        }
                      >
                        Current Students
                      </NavLink>
                    </div>

                    {/* Alumni */}
                    <div className="relative">
                      <div className="absolute left-0 top-3 w-4 h-0.5 bg-base-300"></div>
                      <NavLink
                        to={`/member/${section.key}/alumni`}
                        className={({ isActive }) =>
                          `block ml-4 py-1 text-lg transition-all ${
                            isActive
                              ? 'text-accent font-semibold scale-105'
                              : 'text-base-content hover:text-accent'
                          }`
                        }
                      >
                        Alumni
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default LeftSidebar;