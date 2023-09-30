import React from 'react'
import LoginForm from '../components/LoginForm'
import LoginShopping from '../assets/home/Login-shopping.jpg'
import { Typography } from '@mui/material'

const Login = () => {
  return (
    <section  className="flex justify-around items-center h-screen">
      <div className="flex flex-col justify-center items-center w-2/5">
        <Typography variant='h3' className='text-yellow-600 pb-8'>Welcome Back !!</Typography>
        <LoginForm />
      </div>
      <div className="flex justify-center items-center w-2/4">
        <img src={LoginShopping} alt='login-pic' />
      </div>
    </section>
  )
}

export default Login
