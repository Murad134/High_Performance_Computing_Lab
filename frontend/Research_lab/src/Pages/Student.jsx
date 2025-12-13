// // import React, { useMemo } from 'react';
// // import { useLoaderData, useParams } from 'react-router-dom';
// // import StudentCard from '../Components/StudentCard';

// // function StudentList() {
// //     const data = useLoaderData();
// //     const { level, type } = useParams();

// //     const filteredData = useMemo(() => {
// //         if (!data || !level) return [];

// //         return data.filter(item => {
// //             const matchesLevel = item.studentLevel?.toLowerCase() === level.toLowerCase();
// //             const matchesType = type === 'alumni' ? item.isAlumni === true : !item.isAlumni;
// //             return matchesLevel && matchesType;
// //         });
// //     }, [data, level, type]);

// //     const isAlumni = type === 'alumni';
// //     const title = `${level?.toUpperCase()} - ${isAlumni ? 'Alumni' : 'Current Students'}`;

// //     return (
// //         <div className="min-h-screen">
// //             {/* Header */}
// //             <header className="mb-8">
// //                 <div className="text-sm breadcrumbs mb-2">
// //                     <ul>
// //                         <li>Members</li>
// //                         <li className="font-semibold">{level?.toUpperCase()}</li>
// //                         <li className="font-semibold text-primary">
// //                             {isAlumni ? 'Alumni' : 'Current Students'}
// //                         </li>
// //                     </ul>
// //                 </div>
// //                 <h1 className="text-4xl font-bold text-base-content">{title}</h1>
// //                 <div className="divider" />
// //             </header>

// //             {/* Cards Grid */}
// //             {filteredData.length === 0 ? (
// //                 <div className="alert alert-info shadow-lg">
// //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                     </svg>
// //                     <span>
// //                         No {isAlumni ? 'alumni' : 'students'} found for {level?.toUpperCase()}
// //                     </span>
// //                 </div>
// //             ) : (
// //                 <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
// //                     {filteredData.map((item) => (
// //                         <StudentCard key={item.id || item.roll} item={item} />
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// // export default StudentList;

// // StudentList.jsx
// import React, { useMemo, useState } from 'react'; // ✅ UPDATED: Added useState
// import { useLoaderData, useParams, useNavigate } from 'react-router-dom'; // ✅ UPDATED: Added useNavigate
// import StudentCard from '../Components/StudentCard';
// import AlumniCard from '../Components/Details/AlumniDetails'; // ✅ NEW: Import AlumniCard
// function StudentList() {
//     const initialData = useLoaderData();
//     const { level, type } = useParams();
//     const navigate = useNavigate();
    
//     // ✅ NEW: Local state to manage data
//     const [data, setData] = useState(initialData);

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

//     // ✅ NEW: Handle when student is marked as completed (alumni)
//     const handleStudentUpdate = (updatedStudent) => {
//         setData(prevData => 
//             prevData.map(item => 
//                 item.id === updatedStudent.id ? updatedStudent : item
//             )
//         );
        
//         // Auto-navigate to alumni page after 1.5 seconds
//         if (updatedStudent.isAlumni && type !== 'alumni') {
//             setTimeout(() => {
//                 navigate(`/members/${level}/alumni`);
//             }, 1500);
//         }
//     };

//     // ✅ NEW: Handle when student is deleted
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
//                     {/* ✅ UPDATED: Conditional rendering based on alumni status */}
//                     {filteredData.map((item) => (
//                         isAlumni ? (
//                             <AlumniCard 
//                                 key={item.id || item.roll} 
//                                 item={item}
//                                 onDelete={handleStudentDelete}
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

// StudentList.jsx (Your existing code is already correct!)
import React, { useMemo, useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import StudentCard from '../Components/StudentCard';
import AlumniCard from '../Components/Details/AlumniDetails';

function StudentList() {
    const initialData = useLoaderData();
    const { level, type } = useParams();
    const navigate = useNavigate();
    
    // ✅ Local state to manage all data
    const [data, setData] = useState(initialData);

    // ✅ Filter data based on level and type (current/alumni)
    const filteredData = useMemo(() => {
        if (!data || !level) return [];

        return data.filter(item => {
            const matchesLevel = item.studentLevel?.toLowerCase() === level.toLowerCase();
            const matchesType = type === 'alumni' ? item.isAlumni === true : !item.isAlumni;
            return matchesLevel && matchesType;
        });
    }, [data, level, type]);

    const isAlumni = type === 'alumni';
    const title = `${level?.toUpperCase()} - ${isAlumni ? 'Alumni' : 'Current Students'}`;

    // ✅ KEY FUNCTION: Updates student to alumni in the data array
    const handleStudentUpdate = (updatedStudent) => {
        // Update the data array - replace old student with updated one
        setData(prevData => 
            prevData.map(item => 
                item.id === updatedStudent.id ? updatedStudent : item
            )
        );
        
        // ✅ Auto-navigate to alumni page to see the newly added alumni
        if (updatedStudent.isAlumni && type !== 'alumni') {
            setTimeout(() => {
                navigate(`/members/${level}/alumni`);
            }, 1500);
        }
    };

    // ✅ Handle when student is deleted
    const handleStudentDelete = (studentId) => {
        setData(prevData => 
            prevData.filter(item => item.id !== studentId)
        );
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="mb-8">
                <div className="text-sm breadcrumbs mb-2">
                    <ul>
                        <li>Members</li>
                        <li className="font-semibold">{level?.toUpperCase()}</li>
                        <li className="font-semibold text-primary">
                            {isAlumni ? 'Alumni' : 'Current Students'}
                        </li>
                    </ul>
                </div>
                <h1 className="text-4xl font-bold text-base-content">{title}</h1>
                <div className="divider" />
            </header>

            {/* Cards Grid */}
            {filteredData.length === 0 ? (
                <div className="alert alert-info shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        No {isAlumni ? 'alumni' : 'students'} found for {level?.toUpperCase()}
                    </span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                    {/* ✅ Conditional rendering: AlumniCard for alumni, StudentCard for current */}
                    {filteredData.map((item) => (
                        isAlumni ? (
                            <AlumniCard 
                                key={item.id || item.roll} 
                                item={item}
                                onDelete={handleStudentDelete}
                            />
                        ) : (
                            <StudentCard 
                                key={item.id || item.roll} 
                                item={item}
                                onUpdate={handleStudentUpdate}
                                onDelete={handleStudentDelete}
                            />
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default StudentList;