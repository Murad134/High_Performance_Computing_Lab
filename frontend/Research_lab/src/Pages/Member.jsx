// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import LeftSidebar from '../Components/PartitionMember';

// function Member() {
//   return (
//     <div className='mt-16 min-h-screen bg-base-200'>
//       <div className="flex">
//         {/* Left Sidebar - Fixed */}
//         <aside className="w-64 bg-base-100 shadow-xl min-h-screen sticky top-16">
//           <LeftSidebar />
//         </aside>
//         {/* Main content - Full width */}
//         <main className="flex-1 p-6">
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
      <div className="flex pt-16">
        {/* Left Sidebar - Fixed, will scroll independently */}
        <LeftSidebar />
        
        {/* Main content - Full width, separate scroll */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Member;