import React from 'react'
import Profile  from '../assets/user/man.png'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCardIcon from '@mui/icons-material/AddCard';
import { Avatar } from '@mui/material';

export const SlidebarData = [
    {
        title: 'My Account',
        forAdmin: false,
        logo: <Avatar src={Profile} sx={{ width: 24, height: 24 }} />,
        dropDown: false,
        link: '/user/account'
    },
    {
        title: 'My Cart',
        forAdmin: false,
        logo: <ShoppingCartIcon />,
        dropDown: false,
        link: '/user/cart'
    },
    {
        title: 'My Orders',
        forAdmin: false,
        logo: <BusinessCenterIcon />,
        dropDown: false,
        link: '/user/orders'
    },
    {
        title: 'My Wishlist',
        forAdmin: false,
        logo: <FavoriteBorderOutlinedIcon />,
        dropDown: false,
        link: '/user/wishlists'
    },
    {
        title: 'Manage Inventory',
        forAdmin: true,
        logo: <InventoryIcon />,
        dropDown: true,
        elements: [
            {
                title: 'Products',
                logo: <ShoppingBagIcon />,
                link: '/user/inventory/products'
            },
            {
                title: 'Categories',
                logo: <AddCardIcon />,
                link: '/user/inventory/categories'
            },
            {
                title: 'Users',
                logo: <AccountCircleIcon />,
                link: '/user/inventory/users'
            },
        ]
    },
]

