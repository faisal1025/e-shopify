import React from 'react'
import Profile  from '../assets/user/man.png'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';

export const SlidebarData = [
    {
        title: 'My Account',
        logo: <Avatar src={Profile} sx={{ width: 24, height: 24 }} />,
        link: '/user/account'
    },
    {
        title: 'My Cart',
        logo: <ShoppingCartIcon />,
        link: '/user/cart'
    },
    {
        title: 'My Orders',
        logo: <BusinessCenterIcon />,
        link: '/user/orders'
    },
    {
        title: 'My Wishlist',
        logo: <FavoriteBorderOutlinedIcon />,
        link: '/user/wishlists'
    },
    {
        title: 'Add Products',
        logo: <AddIcon />,
        link: '/user/add-products'
    },
]

