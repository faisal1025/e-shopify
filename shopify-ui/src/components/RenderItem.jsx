
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { add, remove, addCartItem } from '../services/product/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscountedPricePercentage, notAdded, notifyAdded, notifyAlreadyAdded } from '../utils/helper'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_BASE_URL;


const RenderItem = ({item, type, ind}) => {
    const {isAuthenticated, user} = useSelector(store => store.user)
    const {cartItems} = useSelector(store => store.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    return (
        <>
            {
                <Card variant={'outlined'} className='min-w-[20%] hover:scale-105 hover:cursor-pointer'>
                    <Link to={`/${item.slug}/details?ind=${ind}`}>
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

                    </Link>
                        <CardActions> 
                            <button className='w-full rounded-full bg-black text-white h-11' onClick={(e)=>{
                                e.stopPropagation(); 
                                const val = notAdded(item._id, cartItems);

                                if(val=== true){
                                    isAuthenticated?dispatch(addCartItem({qty: 1, productId: item._id}))
                                    :dispatch(add({item:{qty: 1, productId:item}}))
                                    notifyAdded();
                                }else{
                                    notifyAlreadyAdded();
                                }
                            }}>Add to Cart</button>
                        </CardActions>
                    </Card>


            }
        </>
    )
}

export default RenderItem
