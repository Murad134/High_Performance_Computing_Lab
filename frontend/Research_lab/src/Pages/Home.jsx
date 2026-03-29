// import React from 'react'
// import WelcomeSection from '../Components/HomeComponents/WelcomeSection'
// import Stat from '../Components/HomeComponents/Stat'
// import Aboutsection from '../Components/HomeComponents/Aboutsection'
// import Picture_Awards from '../Components/HomeComponents/Picture_Awards'
// import Publications from '../Components/HomeComponents/PublicationsSection'
// import DepartmentHome from '../Components/HomeComponents/DepartmentHome'
// import ResearchHome from '../Components/HomeComponents/ResearchHome'
// function Home() {
//   return (
//     <div className='pt-16'>
//       <WelcomeSection />
//       <Aboutsection />
//       <div className='px-6 py-10'>
//         <Stat />
//       </div>
//       <div>
//         <h3 className='text-5xl flex items-center justify-center text-teal-500 py-8' >All Research Department</h3>
//         <DepartmentHome />
//         <br />
//         <h3 className='text-5xl flex items-center justify-center text-teal-500 py-8' >Research Interests</h3>
//         <ResearchHome />
//       </div>
//       <Publications />
//       <div>
//         <h3 className='text-5xl flex items-center justify-center text-black-500 py-8'>Awards Pictures</h3>
//         <Picture_Awards />
//       </div>
//     </div>
//   )
// }
// export default Home


import React from "react";
import WelcomeSection from "../Components/HomeComponents/WelcomeSection";
import Stat from "../Components/HomeComponents/Stat";
import Aboutsection from "../Components/HomeComponents/Aboutsection";
import Picture_Awards from "../Components/HomeComponents/Picture_Awards";
import Publications from "../Components/HomeComponents/PublicationsSection";
import DepartmentHome from "../Components/HomeComponents/DepartmentHome";
import ResearchHome from "../Components/HomeComponents/ResearchHome";

function Home() {
  return (
    <div className="pt-16 bg-gray-50">

      {/* Hero */}
      <WelcomeSection />

      {/* 1 About */}
      {/* <section className=" py-10 md:py-14">
        <Aboutsection />
      </section> */}

      {/* 2 picture about */}
      <section >
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-teal-600 mb-8 md:mb-12 pt-10">
          About The Lab
        </h3>
        <Aboutsection />
      </section>


      {/* Stats */}
      <section className=" py-10 md:py-14">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-teal-600 mb-8 md:mb-12">
          Lab Statistics
        </h3>
        <div className="px-2 sm:px-4 md:px-6 lg:px-10">
          <Stat />
        </div>
      </section>

      {/* Departments */}
      <section className="px-4 sm:px-6 md:px-10 py-12 md:py-16">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-teal-600 mb-8 md:mb-12">
          All Research Departments
        </h3>
        <DepartmentHome />
      </section>

      {/* Research */}
      <section className=" py-12 md:py-16">
        <div className="px-4 sm:px-6 md:px-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-teal-600 mb-8 md:mb-12">
            Research Interests
          </h3>
          <ResearchHome />
        </div>
      </section>

      {/* Publications */}
      <section className="px-4 sm:px-6 md:px-10 py-6 md:py-10">
        <Publications />
      </section>

      {/* Awards */}
      <section className=" py-6 md:py-10">
        <div className="px-4 sm:px-6 md:px-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-12">
            Awards Pictures
          </h3>
          <Picture_Awards />
        </div>
      </section>

    </div>
  );
}

export default Home;