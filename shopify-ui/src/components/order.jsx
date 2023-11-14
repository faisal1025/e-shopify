import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import RenderItem from './RenderItem'
import emptyCart from '../assets/home/empty-cart.jpg'
import { add, remove, addCartItem } from '../services/product/cartSlice'
import { gettingOrders } from '../services/product/orderSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import { Link } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Order = () => {
  const {isLoading, data} = useSelector(store => store.order)
  const {user} = useSelector(store => store.user)
  const dispatch = useDispatch()
  const [orderedProducts, setOrderedProducts] = useState(null);

  useEffect(()=>{
    dispatch(gettingOrders())
        .then(result => {
            console.log("order.jsx", result);
            let products = result.payload.result.flatMap((res, ind) => {
                let orderedOn = moment(res.createdAt).format('Do-MM-YY, h:mm:ss a');
                return (res.products.map((product)=>{
                    return {...product, orderNo:res.razorpay_order_id, orderedOn}
                }))
            })
            console.log(products);
            setOrderedProducts(products)
        })
  }, [])

  return (
    <>
        <Card className='w-full min-h-screen relative' variant="outlined">
            <CardHeader title={'My Orders'}/>
            <CardContent>
                <ul className='space-y-4'>
                {
                    data?.result?.length === 0 ? 
                    <div className='flex h-96 justify-center items-center'>
                        <img src={emptyCart} width={300} alt='empty-cart'/>
                        <Typography variant='h4'> Please Order first </Typography>
                    </div>
                    :
                    (<div className='flex flex-row w-full'>
                        <div className="w-full">
                        {
                            orderedProducts?.map((product, ind) => {
                                let item = product.productId
                                return(
                                    <Link to={`/order-details/${product.orderNo}`} >
                                        <div className="flex py-5 gap-3 md:gap-5 border-b">
                                            {/* IMAGE START */}
                                            <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                                                <img
                                                    width={120} 
                                                    height={120} 
                                                    src={`${BASE_URL}/${item.thumbnail}`} 
                                                    alt={item.name} 
                                                />
                                            </div>
                                            {/* IMAGE END */}
                            
                                            <div className="w-full flex flex-col">
                                                <div className="flex flex-col md:flex-row justify-between">
                                                    {/* PRODUCT TITLE */}
                                                    <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                                                        {item.name}
                                                    </div>
                                
                                                    {/* PRODUCT SUBTITLE */}
                                                    <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                                                        {item.subTitle}
                                                    </div>
                                
                                                    {/* PRODUCT PRICE */}
                                                    <div className="text-sm md:text-md font-bold text-black/[0.5]">
                                                        MRP : &#8377;{item.price}
                                                    </div>
                                                </div>
                                
                                                {/* PRODUCT SUBTITLE */}
                                                <div className="text-md font-medium text-black/[0.5] hidden md:block">
                                                    {item.subTitle}
                                                </div>
                                                
                                                <div className="flex flex-row justify-between">
                                                        <div className="flex items-center gap-1">
                                                            <div className="font-semibold">Quantity:</div>
                                                            <select
                                                                className="hover:text-black"
                                                                onChange={(e) => {e.stopPropagation()}}
                                                            >
                                                                {Array.from(
                                                                    { length: 50 },
                                                                    (_, i) => i + 1
                                                                ).map((q, i) => {
                                                                    return (
                                                                        <option
                                                                            key={i}
                                                                            value={q}
                                                                            //  selected={data.quantity === q}
                                                                        >
                                                                            {q}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <div className='font-semibold'>{'Ordered on: '}
                                                                <Typography variant='body2' component={'span'} fontSize={'0.8rem'}>
                                                                    {product.orderedOn}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </Link>
                                )
                            })
                        }
                        </div>
                    </div>)
                }
                </ul>
                </CardContent>
                <CardActions disableSpacing>
                {/* <Box component={'div'} className='w-4/5 flex justify-evenly absolute bottom-0 bg-white p-2'>
                    <Typography component={'h1'} variant='h5'>Total Amount : ${totalAmount}</Typography>
                    <Button variant='outlined' color='primary'>PLace Orders</Button>
                </Box> */}
            </CardActions>
        </Card>
        </>
        )
}

export default Order
