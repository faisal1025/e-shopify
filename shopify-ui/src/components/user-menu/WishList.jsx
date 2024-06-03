import React, { useEffect } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import emptyCart from '../../assets/home/empty-cart.jpg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doLikeProduct, getAnonymousLiked, unLike, unLikedProducts } from '../../services/product/wishListSlice'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const WishList = () => {
  const {isLoading, likedItems} = useSelector(store => store.wishList)
  const {user, isAuthenticated} = useSelector(store => store.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    isAuthenticated?
      dispatch(doLikeProduct(null))
        .then(result => console.log(result))
        .catch(err => console.log(err)):
      dispatch(getAnonymousLiked());
  }, [])

  return (
    <>
        <Card className='w-full min-h-screen relative' variant="outlined">
            <CardHeader title={'My WishList'}/>
            <CardContent>
              <ul className='space-y-4'>
                {
                  likedItems?.length === 0 ? 
                    <div className='flex h-96 flex-col justify-center items-center'>
                      <img src={emptyCart} width={300} alt='empty-cart'/>
                      <div className='font-semibold'>Your WishList is Empty ! </div>
                    </div>
                  :
                    (<div className='flex flex-row justify-between'>
                      <div className="w-full">
                      {
                        likedItems.map((product, ind) => {
                          let item = product.productId
                          return(
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
                                    
                                    <div className="flex flex-row justify-end">
                                          <IconButton fullWidth onClick={(e)=>{e.stopPropagation(); 
                                          isAuthenticated?dispatch(unLikedProducts(item._id)):dispatch(unLike(item._id))}}>
                                            <FavoriteIcon fontSize={'medium'} sx={{color: 'firebrick'}}/>
                                          </IconButton>
                                    </div>
                                </div> 
                         </div>
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

export default WishList
