// import { Outlet } from "react-router-dom";
// import NavigationResearch from "../../Components/LeftAside/Navigation_Research";
// function Researchs() {
//   return (
//     <div className="grid grid-cols-[280px_1fr]  min-h-screen">

//       {/* Left Sidebar */}
//       <NavigationResearch />

//       {/* Main Content */}
//       <main className="px-4 py-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
// export default Researchs;


import { Outlet } from "react-router-dom";
import NavigationResearch from "../../Components/LeftAside/Navigation_Research";

function Researchs() {
  return (
    <div className="min-h-screen bg-base-200">
      
      <div className="flex flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full md:w-[280px] ">
          <NavigationResearch />
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-3 sm:px-4 md:px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}

export default Researchs;