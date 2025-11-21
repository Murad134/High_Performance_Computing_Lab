import React from 'react'
import LeftAsideMember from '../Components/LeftAsideMember'
import { Outlet } from 'react-router-dom'

function Member() {
  return (
    <div className='mt-14'>
      {/* Fixed top navbar */}
      <div className=" left-0 right-0 z-50 bg-gray-100  py-1 shadow-sm">
        <LeftAsideMember />
      </div>
      {/* Main content */}
      <main className="w-full mx-auto px-4">
        <Outlet />
      </main>
    </div>
  )
}
export default Member