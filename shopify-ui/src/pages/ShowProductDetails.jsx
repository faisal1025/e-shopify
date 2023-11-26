import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDiscountedPricePercentage } from '../utils/helper';
import ProductDetailsCarousel from '../components/ProductDetailsCarousel';
import ReactMarkdown from "react-markdown";
import { getProductById } from '../services/product/productSlice';
import { add, addCartItem } from '../services/product/cartSlice';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { doLikeProduct, doLike, isLikedProduct, isLikedLocal, unLikedProducts, unLike } from '../services/product/wishListSlice';
import {useSearchParams} from 'react-router-dom'

const ShowProductDetails = () => {
    const searchParams = useSearchParams()[0];
    const ind = searchParams.get('ind');
    const {state} = useLocation()
    const dispatch = useDispatch()
    const {isAuthenticated, user} = useSelector(store => store.user)
    const { slug } = useParams();
    const {isLiked, likedItems} = useSelector(store => store.wishList)
    const idProduct = useSelector(store => store.idProduct);
    const p = idProduct.data?.content?.data;
        
    useEffect(()=> { 
        dispatch(getProductById(slug)).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        })  

        isAuthenticated
            ?dispatch(isLikedProduct({slug}))
            :dispatch(isLikedLocal({slug}))
    }, [likedItems])

    const notify = () => {
        toast.success("Success. Check your cart!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    return (
        <>
            {
                idProduct.isLoading ? 
                <div className='h-screen w-full flex justify-center items-center bg-slate-700'>
                <h1 className='text-white'> Loading... </h1> 
                </div> :
                null
            }

            {p && (
                <div className="w-full md:py-20">
                    <ToastContainer />
                    {/* <Wrapper> */}
                        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                            {/* left column start */}
                            <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                                <ProductDetailsCarousel images={p.photos} />
                            </div>
                            {/* left column end */}

                            {/* right column start */}
                            <div className="flex-[1] py-3">
                                {/* PRODUCT TITLE */}
                                <div className="text-[34px] font-semibold mb-2 leading-tight">
                                    {p.name}
                                </div>

                                {/* PRODUCT SUBTITLE */}
                                <div className="text-lg font-semibold mb-5">
                                    {p.subTitle}
                                </div>

                                {/* PRODUCT PRICE */}
                                <div className="flex items-center">
                                    <p className="mr-2 text-lg font-semibold">
                                        MRP : &#8377;{p.price}
                                    </p>
                                    {p.originalPrice && (
                                        <>
                                            <p className="text-base  font-medium line-through">
                                                &#8377;{p.originalPrice}
                                            </p>
                                            <p className="ml-auto text-base font-medium text-green-500">
                                                {getDiscountedPricePercentage(
                                                    p.price,
                                                    p.originalPrice
                                                )}
                                                % off
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="text-md font-medium text-black/[0.5]">
                                    incl. of taxes
                                </div>
                                <div className="text-md font-medium text-black/[0.5] mb-20">
                                    {`(Also includes all applicable duties)`}
                                </div>

                                {/* PRODUCT SIZE RANGE START */}
                                <div className="mb-10">
                                    {/* HEADING START */}
                                    <div className="flex justify-between mb-2">
                                        <div className="text-md font-semibold">
                                            Select Size
                                        </div>
                                        <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                            Select Guide
                                        </div>
                                    </div>
                                    {/* HEADING END */}

                                    {/* SIZE START */}
                                    {/* <div
                                        id="sizesGrid"
                                        className="grid grid-cols-3 gap-2"
                                    >
                                        {p.size.data.map((item, i) => (
                                            <div
                                                key={i}
                                                className={`border rounded-md text-center py-3 font-medium ${
                                                    item.enabled
                                                        ? "hover:border-black cursor-pointer"
                                                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                                } ${
                                                    selectedSize === item.size
                                                        ? "border-black"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    setSelectedSize(item.size);
                                                    setShowError(false);
                                                }}
                                            >
                                                {item.size}
                                            </div>
                                        ))}
                                    </div> */}
                                    {/* SIZE END */}

                                    {/* SHOW ERROR START */}
                                    {/* {showError && (
                                        <div className="text-red-600 mt-1">
                                            Size selection is required
                                        </div>
                                    )} */}
                                    {/* SHOW ERROR END */}
                                </div>
                                {/* PRODUCT SIZE RANGE END */}

                                {/* ADD TO CART BUTTON START */}
                                <button
                                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                                    onClick={()=>{
                                        isAuthenticated?
                                        dispatch(addCartItem({qty: 1, productId: p._id})):
                                        dispatch(add({item:{qty: 1, productId:p}}))
                                    }}
                                >
                                    Add to Cart
                                </button>
                                {/* ADD TO CART BUTTON END */}

                                {/* WHISHLIST BUTTON START */}
                                <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10" onClick={
                                    ()=>{
                                        isLiked?
                                        isAuthenticated?
                                        dispatch(unLikedProducts(p._id)):
                                        dispatch(unLike(p._id)):
                                        isAuthenticated?
                                        dispatch(doLikeProduct({productId: p._id})):
                                        dispatch(doLike({productId: p}))
                                    }
                                }>
                                    Whishlist
                                    <FavoriteIcon fontSize={'medium'} sx={isLiked?{color: 'firebrick'}:{color: 'black'}}/>
                                </button>
                                {/* WHISHLIST BUTTON END */}

                                <div>
                                    <div className="text-lg font-bold mb-5">
                                        Product Details
                                    </div>
                                    <div className="markdown text-md mb-5">
                                        <ReactMarkdown>{p.description}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                            {/* right column end */}
                        </div>
                        {/* <ProductReviews /> */}
                        {/* <RelatedProducts products={products} /> */}
                    {/* </Wrapper> */}
                </div> 
            )}
        </>
    )
}

export default ShowProductDetails
