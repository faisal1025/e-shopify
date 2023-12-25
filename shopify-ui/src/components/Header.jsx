import { logoutUser, toggleMenu } from '../services/user/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, IconButton, Menu, MenuItem, OutlinedInput, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SlidebarData } from '../utils/SlidebarData'
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { addCartItem, getLocalCartItem } from '../services/product/cartSlice';
import { doLikeProduct, getAnonymousLiked } from '../services/product/wishListSlice';
import Search from './Search';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false)
  const dispatch = useDispatch()
  const {isAuthenticated, user, showMenu} = useSelector(store => store.user)
  const cart = useSelector((store)=>store.cart)
  const {likedItems} = useSelector(store => store.wishList)

  useEffect(()=>{
    if(isAuthenticated){
      dispatch(addCartItem(null));
      dispatch(doLikeProduct(null));
    }else{
      dispatch(getLocalCartItem());
      dispatch(getAnonymousLiked());
    }
  }, [isAuthenticated])
  
  const handleClick = () => {
      setAnchorEl(!anchorEl);
  }

  const handleClose = () => {
    dispatch(toggleMenu())
  }

  return (
    <>
      <header className='bg-white'>
        <nav className='h-14 flex justify-between'> 
          <ul className="flex space-x-4 justify-center items-center">
            <li>
              <div className="flex items-center">
                <Link to={'/'} ><Typography variant='h5' color={"navy"}>E-SHOPIFY</Typography></Link>
              </div>
            </li>
          </ul>
          <ul className="flex space-x-4 justify-center items-center">
            <li>
               <Search />
            </li>
            {
              isAuthenticated ?
              <>
                <li onClick={()=>{dispatch(toggleMenu({toggle: !showMenu}))}}>
                  <Avatar variant='circular'>{user.first_name[0]}</Avatar>
                  {/* <Menu
                    anchorEl={showMenu}
                    id="account-menu"
                    open={showMenu}
                    onClose={() => dispatch(toggleMenu({toggle: !showMenu}))}
                    onClick={() => dispatch(toggleMenu({toggle: !showMenu}))}
                    slotProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    {
                      SlidebarData.map((item, key) => {
                        console.log("showMenu: ", showMenu);
                        return (
                          <MenuItem onClick={()=>{dispatch(toggleMenu(!showMenu))}}>
                            {

                                (item.forAdmin === false || user.isAdmin === true) ?
                                item.dropDown?
                                <>
                                      <li key={key} className='flex justify-start items-center px-2 w-full hover:scale-105 cursor-pointer py-2'
                                      onClick={handleClick}
                                      >
                                          <Typography variant='body1' component={'div'} sx={{marginRight: 1}}>{item.logo}</Typography>
                                          <Typography variant='body2' component={'div'} >{item.title}</Typography>
                                          {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                      </li>
                                      {anchorEl && (
                                          <ul>
                                              {
                                                item.elements.map((ele, key) => {
                                                  return (
                                                      <Link key={key} to={ele.link} className='w-full hover:scale-105'>
                                                          <li className='flex justify-start items-center px-2 cursor-pointer py-2'>
                                                              <Typography variant='body1' component={'div'} sx={{marginRight: 1}}>{ele.logo}</Typography>
                                                              <Typography variant='body2' component={'div'} >{ele.title}</Typography>
                                                          </li>
                                                      </Link> 
                                                  )
                                                })
                                              }
                                          </ul>
                                      )}
                                      </>
                                  :
                                  <Link to={item.link} className='w-full hover:scale-105'>
                                      <li key={key} className='flex justify-start items-center px-2 cursor-pointer py-2'>
                                          <Typography variant='body1' component={'div'} sx={{marginRight: 1}}>{item.logo}</Typography>
                                          <Typography variant='body2' component={'div'} >{item.title}</Typography>
                                      </li>
                                  </Link> 
                                  : null
                            }
                          </MenuItem>
                        )
                      })
                    }
                  </Menu> */}
                </li>
                <li>
                  <Button variant='outlined' color='primary' onClick={()=>{dispatch(logoutUser())}}>Logout</Button>
                </li>
              </> :
              <>
              <li>
                <Link to={'/login'} >
                  <Button variant='outlined' color='primary'>Login</Button>
                </Link>
              </li>
              <li>
                <Link to={'/register'}>
                  <Button variant='outlined' color='primary'>Register</Button> 
                </Link>
              </li>
              </>
            }
            <li className='hover:bg-slate-400 rounded-full'>
              <Link to={'/user/wishlists'}>
                  <IconButton variant='outlined' color='black' className='flex flex-col justify-center relative'>
                    <Typography variant='body2' component={'span'} className='rounded-full self-end absolute bg-orange-300 w-4 h-4 top-0 right-0 text-xs'>{likedItems?.length || 0}</Typography>
                    <FavoriteIcon fontSize={'medium'}/>
                  </IconButton> 
              </Link>
            </li>
            <li className='hover:bg-slate-400 rounded-full'>
              <Link to={'/user/cart'}>
                  <IconButton variant='outlined' color='black' className='flex flex-col justify-center relative'>
                    <Typography variant='body2' component={'span'} className='rounded-full self-end absolute bg-orange-300 w-4 h-4 top-0 right-0 text-xs'>{cart.total}</Typography>
                    <ShoppingCartIcon />
                  </IconButton> 
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
