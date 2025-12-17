import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import LeftAsideThesis from '../Components/LeftAside/LeftAsideThesis';
import CardThesis from '../Components/CardComponents/CardThesis';

function Thesis() {
  const initialTheses = useLoaderData(); // loader theke data
  const [theses, setTheses] = useState(initialTheses);
  const [activeTab, setActiveTab] = useState('current');

  // ✅ mark as complete - আজকের date automatically endDate হবে
  const handleMarkComplete = (id) => {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    setTheses(prevTheses =>
      prevTheses.map(thesis =>
        thesis.id === id
          ? { ...thesis, isCompleted: true, endDate: today }
          : thesis
      )
    );
  };

  // ✅ mark as incomplete - endDate clear করবে
  const handleMarkIncomplete = (id) => {
    setTheses(prevTheses =>
      prevTheses.map(thesis =>
        thesis.id === id
          ? { ...thesis, isCompleted: false, endDate: '' }
          : thesis
      )
    );
  };

  // filtering based on isCompleted status
  const currentTheses = theses.filter(thesis => !thesis.isCompleted);
  const completedTheses = theses.filter(thesis => thesis.isCompleted);

  const displayTheses =
    activeTab === 'current' ? currentTheses : completedTheses;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top Tabs */}
      <div className="bg-white px-2 py-1 shadow">
        <LeftAsideThesis
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Thesis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 px-2 pb-10">
        {displayTheses.length > 0 ? (
          displayTheses.map(item => (
            <CardThesis
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
              ? '🎉 All theses completed!'
              : 'No completed theses yet'}
          </div>
        )}
      </div>
    </div>
  );
}

export default Thesis;