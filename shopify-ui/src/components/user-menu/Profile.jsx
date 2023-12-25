import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { logoutUser } from '../../services/user/authSlice'
import { Link } from 'react-router-dom'

const Profile = () => {
    const {isAuthenticated, user} = useSelector(store => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <Card className='min-h-screen'>
                <CardHeader title={'My Profile'} />
                <CardContent>
                    <Typography variant='h4' component={"h4"} gutterBottom >{isAuthenticated ? user.first_name+" "+user.last_name : 'User'}</Typography>
                    <div className='grid grid-cols-2 gap-6'>
                        
                        <Button sx={{padding: '1rem'}} onClick={() => navigate('/user/cart')} variant='outlined' color='primary'>
                            {'My Cart'}
                        </Button>
                    
                        <Button sx={{padding: '1rem'}} onClick={() => navigate('/user/orders')} variant='outlined' color='primary'>
                            {'My Orders'}
                        </Button>
                    
                
                        <Button sx={{padding: '1rem'}} onClick={() => navigate('/user/wishlists')} variant='outlined' color='primary'>
                            {'My WishList'}
                        </Button>
                  
                        <Button sx={{padding: '1rem'}} onClick={()=>dispatch(logoutUser())} variant='outlined' color='primary'>
                            {'Logout'}
                        </Button>

                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Profile
