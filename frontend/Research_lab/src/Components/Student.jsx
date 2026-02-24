// import React, { useMemo, useState } from 'react';
// import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
// import StudentCard from './CardComponents/StudentCard';
// import AlumniCard from './CardComponents/AlumniCard';

// function StudentList() {
//     const initialData = useLoaderData();
//     const { level, type } = useParams();
//     const navigate = useNavigate();

//     // ✅ Local state to manage all data
//     const [data, setData] = useState(initialData);

//     // ✅ Filter data based on level and type (current/alumni)
//     const filteredData = useMemo(() => {
//         if (!data || !level) return [];

//         return data.filter(item => {
//             const matchesLevel = item.studentLevel?.toLowerCase() === level.toLowerCase();
//             const matchesType = type === 'alumni' ? item.isAlumni === true : !item.isAlumni;
//             return matchesLevel && matchesType;
//         });
//     }, [data, level, type]);

//     const isAlumni = type === 'alumni';
//     const title = `${level?.toUpperCase()} - ${isAlumni ? 'Alumni' : 'Current Students'}`;

//     // ✅ KEY FUNCTION: Updates student to alumni (or alumni back to student)
//     const handleStudentUpdate = (updatedStudent) => {
//         // Update the data array - replace old student with updated one
//         setData(prevData =>
//             prevData.map(item =>
//                 item.id === updatedStudent.id ? updatedStudent : item
//             )
//         );

//         // Navigate to alumni page when marking as completed
//         if (updatedStudent.isAlumni && type !== 'alumni') {
//             setTimeout(() => {
//                 navigate(`/member/${level}/alumni`);
//             }, 1500);
//         }

//         // Navigate to current students page when converting back from alumni
//         if (!updatedStudent.isAlumni && type === 'alumni') {
//             setTimeout(() => {
//                 navigate(`/member/${level}/current`);
//             }, 1500);
//         }
//     };

//     // ✅ Handle when student is deleted
//     const handleStudentDelete = (studentId) => {
//         setData(prevData =>
//             prevData.filter(item => item.id !== studentId)
//         );
//     };

//     return (
//         <div className="min-h-screen">
//             {/* Header */}
//             <header className="mb-8">
//                 <div className="text-sm breadcrumbs mb-2">
//                     <ul>
//                         <li>Members</li>
//                         <li className="font-semibold">{level?.toUpperCase()}</li>
//                         <li className="font-semibold text-primary">
//                             {isAlumni ? 'Alumni' : 'Current Students'}
//                         </li>
//                     </ul>
//                 </div>
//                 <h1 className="text-4xl font-bold text-base-content">{title}</h1>
//                 <div className="divider" />
//             </header>

//             {/* Cards Grid */}
//             {filteredData.length === 0 ? (
//                 <div className="alert alert-info shadow-lg">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span>
//                         No {isAlumni ? 'alumni' : 'students'} found for {level?.toUpperCase()}
//                     </span>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
//                     {/* ✅ Conditional rendering: AlumniCard for alumni, StudentCard for current */}
//                     {filteredData.map((item) => (
//                         isAlumni ? (
//                             <AlumniCard
//                                 key={item.id || item.roll}
//                                 item={item}
//                                 onUpdate={handleStudentUpdate}
//                             />
//                         ) : (
//                             <StudentCard
//                                 key={item.id || item.roll}
//                                 item={item}
//                                 onUpdate={handleStudentUpdate}
//                                 onDelete={handleStudentDelete}
//                             />
//                         )
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
// export default StudentList;


// src/Components/StudentList.jsx



import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import StudentCard from './CardComponents/StudentCard';
import AlumniCard from './CardComponents/AlumniCard';

function StudentList() {
  const { level, type } = useParams();
  const axiosSecure = useAxios();
  const [searchRoll, setSearchRoll] = useState('');

  const { data = [], isLoading,refetch  } = useQuery({
    queryKey: ['studentProjects'],
    queryFn: async () => (await axiosSecure.get('/studentProject')).data,
  });

  const isAlumni = type === 'alumni';

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesLevel = item.student?.studentLevel?.toLowerCase() === level.toLowerCase();
      const matchesType = isAlumni ? item.status === 'completed' : item.status !== 'completed';
      const matchesSearch = searchRoll ? item.student?.roll.includes(searchRoll) : true;
      return matchesLevel && matchesType && matchesSearch;
    });
  }, [data, level, type, searchRoll]);

  return (
    <div className="min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{level?.toUpperCase()} - {isAlumni ? 'Alumni' : 'Current Students'}</h1>
      </header>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Roll Number..."
          value={searchRoll}
          onChange={(e) => setSearchRoll(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500 italic">Loading records...</p>
      ) : filteredData.length === 0 ? (
        <div className="alert alert-info shadow-lg text-center">
          No {isAlumni ? 'alumni' : 'students'} found for {level?.toUpperCase()}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredData.map((item) =>
            isAlumni ? (
              <AlumniCard key={item._id} item={item} refetch={refetch} />
            ) : (
              <StudentCard key={item._id} item={item} refetch={refetch} />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default StudentList;