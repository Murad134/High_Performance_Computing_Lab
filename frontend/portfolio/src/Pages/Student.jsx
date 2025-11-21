import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { filterByLevel } from '../Utility/utils.js';
import StudentCard from '../Components/StudentCard.jsx';

function Student() {
    const data = useLoaderData();       // Loader থেকে dataset
    const { level } = useParams();      // URL থেকে level (bsc, msc, phd)

    // Filter by studentLevel
    const filteredData = filterByLevel(data, level);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
            {filteredData.length === 0 ? (
                <p className="text-gray-500">No students found for {level.toUpperCase()}</p>
            ) : (
                filteredData.map((item, index) => (
                    <StudentCard key={index} item={item} />
                ))
            )}
        </div>
    )
}
export default Student;