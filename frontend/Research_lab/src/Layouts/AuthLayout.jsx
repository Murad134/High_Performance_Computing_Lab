// import React from 'react'
// import Navbar from '../Components/Navbar'
// import { Outlet } from 'react-router-dom'
// function AuthLayout() {
//     return (
//         <div className='bg-base-100 min-h-screen'>
//             <header className='w-11/12 mx-auto py-4'>
//                 <Navbar></Navbar>
//             </header>
//             <main className='w-11/12 mx-auto py-5 pt-16 '>
//                 <Outlet></Outlet>
//             </main>
//         </div>
//     )
// }
// export default AuthLayout


// import React from "react";
// import Navbar from "../Components/Navbar";
// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//   return (
//     <div className="bg-base-100 min-h-screen flex flex-col">

//       {/* Navbar */}
//       <header className="w-full bg-base-100 shadow-sm">
//         <div className="w-11/12 mx-auto py-4">
//           <Navbar />
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col lg:flex-row items-center justify-center w-11/12 mx-auto flex-1 py-10">

//         {/* Left Side → Form */}
//         <div className="w-full lg:w-[47%]">
//           <Outlet />
//         </div>

//         {/* Gap → 1% */}
//         <div className="hidden lg:block w-[1%]" />

//         {/* Right Side → Image */}
//         <div className="w-full lg:w-[47%] flex justify-center">
//           <img
//             src="/assetss/HPC_Login.jpg"
//             alt="Authentication Illustration"
//             className="w-full max-w-sm md:max-w-md lg:max-w-full rounded-lg shadow-2xl"
//           />
//         </div>

//       </main>
//     </div>
//   );
// }

// export default AuthLayout;


// import React from "react";
// import Navbar from "../Components/Navbar";
// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//   return (
//     <div className="bg-base-100 min-h-screen flex flex-col">

//       {/* Navbar */}
//       <header className="w-full bg-base-100 shadow-sm">
//         <div className="w-11/12 mx-auto py-4">
//           <Navbar />
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col-reverse lg:flex-row items-center justify-center w-11/12 mx-auto flex-1 py-10 gap-6">

//         {/* Left Side → Form */}
//         <div className="w-full lg:w-[50%] flex justify-center lg:justify-start">
//           <div className="w-full max-w-md">
//             <Outlet />
//           </div>
//         </div>

//         {/* Right Side → Image */}
//         <div className="w-full lg:w-[49%] flex justify-center">
//           <img
//             src="/assetss/HPC_Login.jpg"
//             alt="Authentication Illustration"
//             className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-full rounded-xl shadow-2xl object-cover"
//           />
//         </div>

//       </main>
//     </div>
//   );
// }

// export default AuthLayout;



import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-base-200 py-6 px-2 md:p-10 flex flex-col">

      {/* Navbar */}
      <header className="w-11/12 mx-auto mb-6">
        <Navbar />
      </header>

      {/* Hero Content */}
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-2 w-11/12 mx-auto">

        {/* Right Side → Image */}
        <div className="flex-1 flex justify-center py-2">
          <img
            src="/assetss/HPC_Login.jpg"
            alt="Auth Illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl shadow-2xl object-cover"
          />
        </div>

        {/* Left Side → Form */}
        <div className="flex-1 w-full max-w-md">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;