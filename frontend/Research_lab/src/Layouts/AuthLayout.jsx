import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
function AuthLayout() {
    return (
        <div className='bg-base-100 min-h-screen'>
            <header className='w-11/12 mx-auto py-4'>
                <Navbar></Navbar>
            </header>
            <main className='w-11/12 mx-auto py-5 pt-16 '>
                <Outlet></Outlet>
            </main>
        </div>
    )
}
export default AuthLayout