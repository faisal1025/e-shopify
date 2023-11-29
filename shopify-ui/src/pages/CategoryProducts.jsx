import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getDiscountedPricePercentage } from '../utils/helper'
import { Link, useParams } from 'react-router-dom'
import { doLike, doLikeProduct, unLike, unLikedProducts } from '../services/product/wishListSlice';
import { add, addCartItem } from '../services/product/cartSlice';
import { toast } from 'react-toastify';
import { changePage } from '../services/common/searchSlice';
import { getCategoryProducts } from '../services/common/categorySlice';
import Pagination from '../components/Pagination';

const BASE_URL = process.env.REACT_APP_BASE_URL 

const CategoryProducts = () => {
    const {category} = useParams();
    const dispatch = useDispatch();
    const {page} = useSelector(store => store.search)
    const {categoryProducts} = useSelector(store => store.category)
    const {isAuthenticated} = useSelector(store => store.user)
    const {likedItems} = useSelector(store => store.wishList)
   

    const isProductLiked = (likedItems, id) => {
        let flag = false;
        likedItems.forEach(product => {
            const item = product.productId;
            if(item._id == id) flag = true;
        })
        return flag;
    }

    const notifyAdded = () => {
        return toast.success("Item successfully added to cart")
    }
    

    useEffect(() => {
        dispatch(getCategoryProducts({category, page}))
            .then(result => console.log('#categoryProduct', result))
            .catch(err => console.log(err))
    }, [page])
        
    useEffect(() => {            
        return () => {
            console.log("unmounted!!");
            dispatch(changePage(0))
        };
    }, [])

    return (
        <>
            <div>
                {
                    categoryProducts&&(
                        <Card>
                            <CardHeader title={categoryProducts.meta?.name}/>
                            <CardContent className='min-h-screen'>
                                <div className='flex flex-row w-full'>
                                    <div className="w-full">
                                        {
                                            categoryProducts?.data.map((item, ind) => {
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
                                {
                                    categoryProducts?.meta?.totalPages > 1 && 
                                    <Pagination pages={categoryProducts?.meta?.totalPages}/>
                                }
                            </CardActions>
                        </Card>
                    )
                }
            </div>
        </>
    )
}

export default CategoryProducts
