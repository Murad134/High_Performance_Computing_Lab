import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../Components/LeftAside/LeftAsidesMember';

function Member() {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex pt-12">
        {/* Left Sidebar - Fixed, will scroll independently */}
        <LeftSidebar />
        
        {/* Main content - Full width, separate scroll */}
        <main className="flex-1 py-8 px-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Member;