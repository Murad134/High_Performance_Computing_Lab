import React from 'react'
import LeftAsideThesis from '../Components/LeftAside/LeftAsideThesis'
import { Outlet } from 'react-router-dom'
function Thesis() {
  return (
    <div>
      <div className=" top-14 left-0 right-0 z-50 bg-white px-6">
        <LeftAsideThesis />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
export default Thesis