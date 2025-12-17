// import React from 'react'
// import LeftAsidePublication from '../Components/LeftAside/LeftAsidePublication'
// import { Outlet } from 'react-router-dom'

// function Publications() {
//     return (
//         <div className="px-2 md:px-4 bg-gray-50 min-h-screen">
//             <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-3">
//                 {/* Left Sidebar */}
//                 <div >
//                     <LeftAsidePublication />
//                 </div>

//                 {/* Main Content Area */}
//                 <main className=" px-2 pt-6 md:p-6">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default Publications

import React from 'react'
import LeftAsidePublication from '../Components/LeftAside/LeftAsidePublication'
import { Outlet } from 'react-router-dom'

function Publications() {
    return (
        <div className="px-2 md:px-4 bg-gray-50 min-h-screen">
            <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr] gap-4">
                {/* Left Sidebar - শুধু 220px width */}
                <div className="">
                    <LeftAsidePublication />
                </div>

                {/* Main Content Area - বাকি পুরো জায়গা */}
                <main className="px-2 pt-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Publications