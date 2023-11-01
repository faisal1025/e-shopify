import React from 'react'
import RenderItem from './RenderItem'
import { Typography } from '@mui/material'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

const TopProducts = ({homeProducts, title}) => {
    return (
        <>
            <div className="space-y-4 pt-5">
              <Typography variant='h5' component={'h1'} className='drop-shadow-2xl'>{title}</Typography>
              <Carousel
                containerClass="-mx-[10px]"
                itemClass="px-[10px]"
                responsive={responsive}>
                {
                  homeProducts.data?.content?.data?.map((item, ind) => {
                    return (
                      <RenderItem key={item._id} item={item} ind={ind} type={{vertical: false}}/>
                      )
                    })
                  }
              </Carousel>
            </div>
        </>
    )
}

export default TopProducts
