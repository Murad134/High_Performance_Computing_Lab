import React from 'react'
import LeftAside from '../Components/LeftAside/LeftAsideProject.jsx';
import CardProject from '../Components/CardProject.jsx';
import { useLoaderData } from 'react-router-dom';
function Project() {
  const projects = useLoaderData(); // data from loader

  return (
    <div>
      {/* Sidebar */}
      <div className="left-0 right-0 z-50 bg-white px-2 py-1">
        <LeftAside />
      </div>

      {/* Project Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24 px-6"> */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 px-2'>
        {projects.map((item, index) => (
          <CardProject key={index} item={item} />
        ))}
      </div>
    </div>
  )
}
export default Project;
