import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import LeftAside from '../Components/LeftAside/LeftAsideProject';
import CardProject from '../Components/CardComponents/CardProject';

function Project() {
  const initialProjects = useLoaderData(); // loader theke data
  const [projects, setProjects] = useState(initialProjects);
  const [activeTab, setActiveTab] = useState('current');

  // ✅ mark as complete - আজকের date automatically endDate হবে
  const handleMarkComplete = (id) => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id
          ? { ...project, isCompleted: true, endDate: today }
          : project
      )
    );
  };

  // ✅ mark as incomplete - endDate clear করবে
  const handleMarkIncomplete = (id) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id
          ? { ...project, isCompleted: false, endDate: '' }
          : project
      )
    );
  };

  // filtering based on isCompleted status
  const currentProjects = projects.filter(project => !project.isCompleted);
  const completedProjects = projects.filter(project => project.isCompleted);

  const displayProjects =
    activeTab === 'current' ? currentProjects : completedProjects;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Tabs */}
      <div className="bg-white px-2 py-1 shadow">
        <LeftAside
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 px-2 pb-10">
        {displayProjects.length > 0 ? (
          displayProjects.map(item => (
            <CardProject
              key={item.id}
              item={item}
              activeTab={activeTab}
              onMarkComplete={handleMarkComplete}
              onMarkIncomplete={handleMarkIncomplete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 text-lg">
            {activeTab === 'current'
              ? '🎉 All projects completed!'
              : 'No completed projects yet'}
          </div>
        )}
      </div>
    </div>
  );
}
export default Project;