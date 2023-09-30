import React from 'react'
import { Outlet } from 'react-router/dist'
import Sidebar from '../components/Sidebar'


const UserOptions = ({Element}) => {
    return (
    <>
        <section className='flex'>
            <section className='w-1/5'>
                <Sidebar />
            </section>
            <section className='w-4/5 p-2'>
                <Outlet />
            </section>
        </section>
    </>
    )
}

export default UserOptions
