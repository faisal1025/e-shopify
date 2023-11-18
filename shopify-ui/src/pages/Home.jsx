
import runningShoe from '../assets/product/running-shoe.png'
import sportsShoe from '../assets/product/sports-shoe.png'
import climbingShoe from '../assets/product/climbing-shoes.png'
import { Avatar, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {getHomeProduct} from '../services/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import HomeShopping from "../assets/home/home-shopping.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import TopProducts from '../components/TopProducts'
import { Link } from 'react-router-dom'


const Home = () => {
  const dispatch = useDispatch();
  const homeProducts = useSelector(store => store.home)

  useEffect(() => {
    dispatch(getHomeProduct()).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  return (
    <>
          {
            homeProducts.isLoading ? 
            <div className='h-screen w-full flex justify-center items-center bg-slate-700'>
              <h1 className='text-white'> Loading... </h1> 
            </div> :
            null
          }
          
          <Carousel
                className='py-5 shadow'
                autoPlay={false}
                infiniteLoop={true}
                showThumbs={false}
                showIndicators={false}
                showStatus={false}
            >

           
            <section className="flex justify-between items-center space-x-5 shadow-xl">
              <div className="title w-2/5 space-y-4 sm:text-xs sm:py-11">
                  <Typography variant='h5' className='text-red-900'>Shop AnyTime, Cancle AnyWhere</Typography>
                  <Typography variant='body2' className='text-2xl font-semibold text-teal-900 md:text-sm'>
                    Grab best deals with ammazing offers till <span className='text-slate-700 font-bold'>13th, Jan 2024</span>. Don't miss, Grab now
                  </Typography>
                  <Button variant='outlined' color='secondary' >Get Best Deals</Button>
                  <Button variant='outlined' color='secondary' >Shop Now</Button>
              </div>
              <div className="avtar w-3/5">
                <img className='w-100' src={HomeShopping} alt='front'/>
              </div>
            </section>
            <section className="flex justify-between items-center space-x-5 shadow-xl">
              <div className="title w-2/5 space-y-4 sm:text-xs sm:py-11">
                  <Typography variant='h5' className='text-red-900'>Shop AnyTime, Cancle AnyWhere</Typography>
                  <Typography variant='body2' className='text-2xl font-semibold text-teal-900 md:text-sm'>
                    Grab best deals with ammazing offers till <span className='text-slate-700 font-bold'>13th, Jan 2024</span>. Don't miss, Grab now
                  </Typography>
                  <Button variant='outlined' color='secondary' >Get Best Deals</Button>
                  <Button variant='outlined' color='secondary' >Shop Now</Button>
              </div>
              <div className="avtar w-3/5">
                <img className='w-100' src={HomeShopping} alt='front'/>
              </div>
            </section>
            <section className="flex justify-between items-center space-x-5 shadow-xl">
              <div className="title w-2/5 space-y-4 sm:text-xs sm:py-11">
                  <Typography variant='h5' className='text-red-900'>Shop AnyTime, Cancle AnyWhere</Typography>
                  <Typography variant='body2' className='text-2xl font-semibold text-teal-900 md:text-sm'>
                    Grab best deals with ammazing offers till <span className='text-slate-700 font-bold'>13th, Jan 2024</span>. Don't miss, Grab now
                  </Typography>
                  <Button variant='outlined' color='secondary' >Get Best Deals</Button>
                  <Button variant='outlined' color='secondary' >Shop Now</Button>
              </div>
              <div className="avtar w-3/5">
                <img className='w-100' src={HomeShopping} alt='front'/>
              </div>
            </section>
            

          </Carousel>

          <section className="py-5 shadow">
            <Typography variant='h4' gutterBottom className='drop-shadow-2xl text-center'>Our Categories</Typography>
            <div className="flex flex-row justify-around items-center">
              <Link to={`/sports-shoe/products`}>
                <div className="flex flex-col justify-center items-center">
                    <Avatar src={sportsShoe} variant='circular' sx={{ width: 100, height: 100, border: 1 }} />
                    <div className='font-semibold'>Sports Shoes</div>
                </div>
              </Link>
              <Link to={`/running-shoe/products`}>
                <div className="flex flex-col justify-center items-center">
                    <Avatar src={runningShoe} variant='circular' sx={{ width: 100, height: 100, border: 1 }} />
                    <div className='font-semibold'>Running Shoes</div>
                </div>
              </Link>
              <Link to={`/climbing-shoe/products`}>
                <div className="flex flex-col justify-center items-center">
                    <Avatar src={climbingShoe} variant='circular' sx={{ width: 100, height: 100, border: 1 }}/>
                    <div className='font-semibold'>Climbing Shoes</div>
                </div>
              </Link>
            </div>
          </section>

          {homeProducts.data && (
            <section className='py-5 shadow-xl'>
              <TopProducts homeProducts={homeProducts} title={'Top Products'}/>
            </section>
          )}
   
   
    </>
  )
}

export default Home
