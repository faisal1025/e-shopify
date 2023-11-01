
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { add, remove, addCartItem } from '../services/product/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscountedPricePercentage } from '../utils/helper'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RenderItem = ({item, type, ind}) => {
    const {isAuthenticated, user} = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            {
                type.vertical ?
                <Card variant={'outlined'} className='min-w-full hover:scale-100 hover:cursor-pointer p-1'>
                    <div className="flex justify-evenly items-center">
                        <img 
                            width={387} 
                            height={387} 
                            src={`${BASE_URL}/${item.thumbnail}`} 
                            alt={item.name} 
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.price}
                            </Typography>
                        </CardContent>

                        <CardActions> 
                            <Button fullWidth size='small' variant='contained' color='error' onClick={()=>{dispatch(remove({item}))}}>Remove from Cart</Button>
                        </CardActions>
                    </div>
                </Card> :
                <Link to={`/${item.slug}/details`}>
                    <Card variant={'outlined'} className='min-w-[20%] hover:scale-105 hover:cursor-pointer'>
                        <img 
                            width={387} 
                            height={387} 
                            src={`${BASE_URL}/${item.thumbnail}`} 
                            alt={item.name} 
                        />
        
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                {item.name}
                            </Typography>
                            <div className="flex items-center">

                            <p className='mr-2 text-lg font-semibold text-slate-500'>
                                &#8377;{item.price}
                            </p>
                            {
                                item.originalPrice&& (
                                    <>
                                        <p className='text-base font-medium line-through text-slate-500'>
                                            &#8377;{item.originalPrice}
                                        </p>
                                        <p className="ml-auto text-base font-medium text-green-500">
                                            {getDiscountedPricePercentage(
                                                item.price,
                                                item.originalPrice
                                                )}
                                            % off
                                        </p>
                                    </>
                                )
                                
                                
                            }
                            </div>
                        </CardContent>

                        <CardActions> 
                            <button className='w-full rounded-full bg-black text-white h-11' onClick={()=>{isAuthenticated?dispatch(addCartItem({qty: 1, productId: item._id})):dispatch(add({item}))}}>Add to Cart</button>
                        </CardActions>
                    </Card>
                </Link>


            }
        </>
    )
}

export default RenderItem
