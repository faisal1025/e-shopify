import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import RegisterShopping from "../assets/home/register-shopping.jpg" 
import { Typography } from '@mui/material'

const Register = () => {
  return (
    <section className='flex justify-around h-screen'>
      <div className="flex flex-col justify-center items-center w-2/5">
        <Typography variant='h3' className='text-yellow-600 pb-8'>Welcome to Shopify</Typography>
        <RegisterForm />
      </div>
      <div className="flex justify-center items-center w-2/4">
        <img src={RegisterShopping} height={50} alt='login-pic' />
      </div>
    </section>
  )
}

export default Register
