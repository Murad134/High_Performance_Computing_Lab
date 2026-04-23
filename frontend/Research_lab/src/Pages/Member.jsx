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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-5 px-3 pb-8 pt-16 md:flex-row md:gap-7 md:px-6">
        <div className="w-full md:w-[340px]">
          <LeftSidebar />
        </div>

        <main className="min-w-0 flex-1 rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.7)] md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Member;