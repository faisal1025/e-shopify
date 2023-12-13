import React from 'react'
import { Outlet } from 'react-router/dist'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'


const MenuOptions = ({Element}) => {
    const {showMenu} = useSelector(store=>store.user)
    return (
    <>
            <div className='flex justify-between'>
                <section className='w-1/5'>
                    <Sidebar />
                </section>
                <section className='w-4/5 p-2'>
                    <Outlet />
                </section>
            </div>
           
    </>
    )
}

export default MenuOptions
