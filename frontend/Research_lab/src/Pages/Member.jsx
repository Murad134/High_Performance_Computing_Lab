// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import LeftSidebar from '../Components/LeftAside/LeftAsidesMember';

// function Member() {
//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="flex pt-12">
//         {/* Left Sidebar - Fixed, will scroll independently */}
//         <LeftSidebar />
        
//         {/* Main content - Full width, separate scroll */}
//         <main className="flex-1 py-8 px-2 overflow-y-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Member;


import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../Components/LeftAside/LeftAsidesMember';

function Member() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex flex-col md:flex-row pt-12">
        
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <LeftSidebar />
        </div>
        
        {/* Main content */}
        <main className="flex-1 py-6 px-3 md:px-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Member;