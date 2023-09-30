import { Avatar, Box, IconButton, OutlinedInput, Typography } from '@mui/material'
import Profile  from '../assets/user/man.png'
import React from 'react'
import { SlidebarData } from '../utils/SlidebarData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Sidebar = () => {
    const {isAuthenticated, user} = useSelector(store => store.user)
    return (
        <>
            <section className="p-2 border-r-4 min-h-screen fixed">
                    {/* <Typography variant='h5' component={'h1'} gutterBottom sx={{textAlign: 'center', marginBottom: 2}}>Our Category</Typography> */}
                <ul className='flex flex-col items-center justify-between pt-2 space-y-5'>
                    <Box component={'div'} className='flex justify-center flex-col items-center w-full border-b-2'>
                        <Avatar
                            alt="Remy Sharp"
                            src={user.profile ? user.profile : Profile}
                            sx={{ width: 100, height: 100, border: 1 }}
                        />
                        <Typography component={'h1'} variant='h5' sx={{paddingY: 2}}>
                        {
                            isAuthenticated ? user.first_name+' '+user.last_name : 'User'
                        }
                        </Typography>
                    </Box>
                    {
                        SlidebarData.map((item, key) => {
                            return(
                                <Link to={item.link} className='w-full hover:scale-105'>
                                    <li key={key} className='flex justify-start items-center px-2 cursor-pointer py-2'>
                                        <Typography variant='body1' component={'div'} sx={{marginRight: 1}}>{item.logo}</Typography>
                                        <Typography variant='body2' component={'div'} >{item.title}</Typography>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </section>
        </>
    )
}

export default Sidebar
