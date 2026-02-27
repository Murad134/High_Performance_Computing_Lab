// import { Outlet, useLoaderData } from "react-router-dom";
// import NavigationResearch from "../../Components/LeftAside/Navigation_Research";
// function Researchs() {
//   const { navigation } = useLoaderData();

//   return (
//     // <div className="flex pt-16 bg-gray-50">
//     //   {/* Left Navigation */}
//     //   <NavigationResearch navigation={navigation} />

//     //   {/* Main Content */}
//     //   <main className="flex-1 p-2 max-w-7xl mx-auto w-full pt-10">
//     //     <Outlet />
//     //   </main>
//     // </div>
//     <div className="grid grid-cols-[320px_1fr] gap-6 bg-gray-50 min-h-screen">
//       {/* Left Navigation - Fixed width */}
//       <NavigationResearch navigation={navigation} />

//       {/* Main Content - Takes remaining space */}
//       <main className="px-6 pt-10 max-w-6xl w-full ">
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
    <div className="grid grid-cols-[280px_1fr] bg-gray-50 min-h-screen">
      
      {/* Left Sidebar */}
      <NavigationResearch />

      {/* Main Content */}
      <main className="p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default Researchs;