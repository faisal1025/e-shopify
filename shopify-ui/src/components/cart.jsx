import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import RenderItem from './RenderItem'

const Cart = () => {
  const {cartItems, totalAmount} = useSelector(store => store.cart)
  const dispatch = useDispatch()
  return (
    <>
        <Card className='w-full' variant="outlined">
          <CardHeader title={'My Cart'}/>
          <CardContent>
            <ul className='space-y-4'>
              {
                cartItems.map((item, ind) => {
                  return(
                    <li key={ind} className=''>
                      <RenderItem type={{vertical: true}} item={item}/>
                    </li>
                  )
                })
              }
            </ul>
          </CardContent>
          <CardActions disableSpacing>
            <Box component={'div'} className='w-4/5 flex justify-evenly fixed bottom-0 bg-white p-2'>
                <Typography component={'h1'} variant='h5'>Total Amount : ${totalAmount}</Typography>
                <Button variant='outlined' color='primary'>PLace Orders</Button>
            </Box>
          </CardActions>
        </Card>
    </>
  )
}

export default Cart
