import { logoutUser } from '../services/user/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, IconButton, OutlinedInput, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { addCartItem, getLocalCartItem } from '../services/product/cartSlice';

const Header = () => {
  const dispatch = useDispatch()
  const {isAuthenticated, user} = useSelector(store => store.user)
  const cart = useSelector((store)=>store.cart)

  useEffect(()=>{
    if(isAuthenticated){
      dispatch(addCartItem(null));
    }else{
      dispatch(getLocalCartItem());
    }
  }, [isAuthenticated])

  return (
    <>
      <header className='sticky top-0 z-10 bg-white'>
        <nav className='h-14 flex justify-between'> 
          <div className="flex items-center">
            <Link to={'/'} ><Typography variant='h5' color={"navy"}>E-SHOPIFY</Typography></Link>
          </div>
          <ul className="flex space-x-4 justify-center items-center">
            <li>
                <OutlinedInput
                    id="input-with-icon-adornment"
                    endAdornment={
                        <IconButton className='border-2 rounded-full hover:bg-slate-400'>
                            <SearchIcon />
                        </IconButton>
                    }
                    variant={'outlined'}
                    placeholder='Search Product'
                    size='small'
                />
            </li>
            {
              isAuthenticated ?
              <>
                <li>
                  <Avatar variant='circular'>{user.first_name[0]}</Avatar>
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
