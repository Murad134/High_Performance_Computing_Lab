// import React from 'react'

// function Alumni() {
//     return (
//         <div>Alumni</div>
//     )
// }

// export default Alumni
import React from 'react'
import { useLoaderData } from 'react-router-dom';
import AlumniDetails from '../Components/AlumniDetails';
function Student() {
    const alumnis = useLoaderData();

    // Filter by studentLevel
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2">
            {
                alumnis.map((item, index) => (
                    <AlumniDetails key={index} item={item} />
                ))
            }
        </div>
    )
}
export default Student;