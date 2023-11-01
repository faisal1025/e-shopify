import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import RenderItem from './RenderItem'
import emptyCart from '../assets/home/empty-cart.jpg'

const Cart = () => {
  const {cartItems, totalAmount} = useSelector(store => store.cart)
  const dispatch = useDispatch()
  return (
    <>
        <Card className='w-full min-h-screen relative' variant="outlined">
          <CardHeader title={'My Cart'}/>
          <CardContent>
            <ul className='space-y-4'>
              {
                cartItems.length === 0 ? 
                  <div className='flex h-96 justify-center items-center'>
                    <img src={emptyCart} width={300}/>
                  </div>
                : cartItems.map((item, ind) => {
                    return(
                      <li key={ind} className=''>
                        <RenderItem type={{vertical: true}} item={item.productId}/>
                      </li>
                    )
                  })
              }
            </ul>
          </CardContent>
          <CardActions disableSpacing>
            <Box component={'div'} className='w-4/5 flex justify-evenly absolute bottom-0 bg-white p-2'>
                <Typography component={'h1'} variant='h5'>Total Amount : ${totalAmount}</Typography>
                <Button variant='outlined' color='primary'>PLace Orders</Button>
            </Box>
          </CardActions>
        </Card>
    </>
  )
}

export default Cart
