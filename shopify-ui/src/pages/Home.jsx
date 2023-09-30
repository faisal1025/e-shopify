
import { Button, Typography } from '@mui/material'
import React from 'react'
import HomeShopping from "../assets/home/home-shopping.jpg"
import RenderItem from '../components/RenderItem'

const items = [
  {
    id: 0,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 1,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 2,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 3,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 4,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 5,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 6,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 7,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 8,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 9,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 10,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 11,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  },
  {
    id: 12,
    name: 'Samsung TV android 13',
    price: 300,
    coverPhoto: 'https://m.media-amazon.com/images/I/81AKBd4a2FL._AC_UY218_.jpg'
  }
]

const Home = () => {
  return (
    <>
          <section className="flex justify-between items-center space-x-5 shadow-xl">
            <div className="title w-2/5 space-y-4">
              <Typography variant='h5' className='text-red-900'>Shop AnyTime, Cancle AnyWhere</Typography>
              <Typography variant='body2' className='text-2xl font-semibold text-teal-900'>
                Grab best deals with ammazing offers till <span className='text-slate-700 font-bold'>13th, Jan 2024</span>. Don't miss, Grab now
              </Typography>
              <div className='flex flex-wrap justify-start items-start'>
                <Button variant='outlined' color='secondary' >Get Best Deals</Button>
                <Button variant='outlined' color='secondary' >Shop Now</Button>
              </div>
            </div>
            <div className="avtar w-3/5">
              <img className='w-100' src={HomeShopping} alt='front'/>
            </div>
          </section>

          <section className="py-5 shadow-xl">
            <Typography variant='h3' className='drop-shadow-2xl text-center'>Our Categories</Typography>
            <div className="space-y-4 pt-5">
              <Typography variant='h5' component={'h1'} className='drop-shadow-2xl'>TV, Mobiles & Gadgets</Typography>
              <div className="flex flex-nowrap justify-center item-center space-x-2 overflow-x-scroll overflow-y-hidden">
                {
                  items.map(item => {
                    return (
                      <RenderItem key={item.id} item={item} type={{vertical: false}}/>
                    )
                  })
                }
              </div>
            </div>
          </section>
   
   
    </>
  )
}

export default Home
