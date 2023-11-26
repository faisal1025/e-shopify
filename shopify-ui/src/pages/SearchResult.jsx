import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import notResults from '../../src/assets/home/no-results.png'
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getDiscountedPricePercentage } from '../utils/helper'
import { Link } from 'react-router-dom'
import { doLike, doLikeProduct, unLike, unLikedProducts } from '../services/product/wishListSlice';
import { add, addCartItem } from '../services/product/cartSlice';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';

const BASE_URL = process.env.REACT_APP_BASE_URL 

const SearchResult = () => {
    const { data } = useSelector(store => store.search)
    const {isAuthenticated} = useSelector(store => store.user)
    const {likedItems} = useSelector(store => store.wishList)
    const dispatch = useDispatch()

    const isProductLiked = (likedItems, id) => {
        let flag = false;
        likedItems.forEach(product => {
            const item = product.productId;
            if(item._id === id) flag = true;
        })
        return flag;
    }

    const notifyAdded = () => {
        return toast.success("Item successfully added to cart")
    }
    
    return (
        <>
            <div className="flex flex-row min-h-screen">
                {
                    data ?
                        <>
                            {
                                data?.results?.length === 0 ?
                                    <div className='flex flex-col justify-center items-center min-w-full'>
                                        <img src={notResults} alt="no-result" style={{ width: '150px', height: '150px', marginBottom: '3rem' }} />
                                        <div className='font-semibold'> {'No results found.'} </div>
                                    </div>
                                    :
                                    <Card className='w-full min-h-screen' variant="elevation">
                                        <CardHeader title={'Search Items'} />
                                        <CardContent className='h-screen'>
                                            <div className='flex flex-row w-full'>
                                                <div className="w-full">
                                                    {
                                                        data?.results.map((item, ind) => {
                                                            return (

                                                                <div className="flex py-5 gap-3 md:gap-5 border-b" >
                                                                    {/* IMAGE START */}
                                                                    <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                                                                        <img
                                                                            width={150}
                                                                            height={150}
                                                                            src={`${BASE_URL}/${item.thumbnail}`}
                                                                            alt={item.name}
                                                                        />
                                                                    </div>
                                                                    {/* IMAGE END */}

                                                                    <div className="w-full flex flex-col">
                                                                        <div className="flex flex-col md:flex-row justify-between">
                                                                            {/* PRODUCT TITLE */}
                                                                            <Link to={`/${item.slug}/details`}>
                                                                                <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                                                                                    {item.name}
                                                                                </div>
                                                                            </Link>

                                                                            {/* PRODUCT SUBTITLE */}
                                                                            <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                                                                                {item.subTitle}
                                                                            </div>

                                                                            {/* PRODUCT PRICE */}
                                                                            <div className="flex flex-row justify-center items-center gap-2">
                                                                                <p className='text-sm md:text-md font-bold text-black/[0.5]'>
                                                                                    MRP : &#8377;{item.price}
                                                                                </p>
                                                                                {
                                                                                    item.originalPrice && (
                                                                                        <>
                                                                                            <p className='text-sm font-medium line-through text-black/[0.5]'>
                                                                                                &#8377;{item.originalPrice}
                                                                                            </p>
                                                                                            <p className="ml-auto text-sm font-medium text-green-500">
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
                                                                                    onChange={(e) => { e.stopPropagation() }}
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
                                                                            <div className='flex flex-row justify-evenly items-center'>
                                                                                <IconButton onClick={() => {
                                                                                     isAuthenticated?
                                                                                     dispatch(addCartItem({qty: 1, productId: item._id})):
                                                                                     dispatch(add({item:{qty: 1, productId:item}}))

                                                                                     notifyAdded();
                                                                                }}>
                                                                                    <AddShoppingCartIcon fontSize='small'/>
                                                                                </IconButton>
                                                                                <IconButton onClick={() => {
                                                                                    isProductLiked(likedItems, item._id)?
                                                                                    isAuthenticated?
                                                                                    dispatch(unLikedProducts(item._id)):
                                                                                    dispatch(unLike(item._id)):
                                                                                    isAuthenticated?
                                                                                    dispatch(doLikeProduct({productId: item._id})):
                                                                                    dispatch(doLike({productId: item}))
                                                                                }}>
                                                                                    <FavoriteIcon fontSize='small'  sx={isProductLiked(likedItems, item._id)? {color: 'firebrick'}: {color: 'grey'}}/>
                                                                                </IconButton>                                           
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardActions className='justify-center items-center'>
                                            {/* <div className='border-2 border-slate-900'>
                                                <IconButton disabled={page === 0 ? true : false} onClick={()=>{dispatch(previousPage())}}>
                                                    <ArrowBackIosNewIcon fontSize='small'/>
                                                </IconButton>
                                            </div>
                                            {
                                                [...Array().keys()].slice(1).map((p) => {
                                                    return (
                                                    <div className="border-2 border-slate-900">
                                                        <IconButton color={page === p ? 'primary' : 'default'} onClick={()=>{dispatch(changePage(p))}}>
                                                            <div className='font-semibold text-sm w-5'>{p}</div>
                                                        </IconButton>
                                                    </div>
                                                    )
                                                })
                                            }
                                            <div className="border-2 border-slate-900">
                                                <IconButton disabled={page === data?.meta?.totalPages-1 ? true : false} onClick={()=>{dispatch(nextPage())}}>
                                                    <ArrowForwardIosIcon fontSize='small'/>
                                                </IconButton>
                                            </div> */}
                                            <Pagination pages={data?.meta?.totalPages}/>
                                        </CardActions>
                                    </Card>
                            }
                        </> :
                        <>
                            <div className='flex flex-col justify-center items-center min-w-full'>
                                <img src={notResults} alt="no-result" style={{ width: '150px', height: '150px', marginBottom: '3rem' }} />
                                <div className='font-semibold'> Please search for the results </div>
                            </div>
                        </>
                }

            </div>
        </>
    )
}

export default SearchResult
