
import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {getHomeProduct} from '../services/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import HomeShopping from "../assets/home/home-shopping.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import TopProducts from '../components/TopProducts'


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

          <section className="py-5 shadow-xl">
            <Typography variant='h4' className='drop-shadow-2xl text-center'>Our Categories</Typography>
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
