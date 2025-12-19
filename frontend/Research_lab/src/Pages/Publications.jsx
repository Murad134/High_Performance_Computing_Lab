
import React from 'react'
import LeftAsidePublication from '../Components/LeftAside/LeftAsidePublication'
import { Outlet } from 'react-router-dom'

function Publications() {
    return (
        <div className="px-2 md:px-4 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Left Sidebar - সব স্ক্রিনে বাম পাশে থাকবে */}
                <div className="w-80 flex">
                    <LeftAsidePublication />
                </div>

                {/* Main Content Area - বাকি জায়গা নেবে */}
                <main className="flex-1 px-2 pt-4 md:p-6 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Publications