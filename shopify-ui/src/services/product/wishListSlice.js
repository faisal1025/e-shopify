import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = "http://127.0.0.1:8001/api/product"

const initialState = {
    isLoading: false,
    isError: false,
    likedItems: [],
    isLiked: false
}

export const unLikedProducts = createAsyncThunk('unLiked', async (id) => {
    const result = await axios.post(`${baseurl}/un-like-product`, {productId: id}, {
        headers: {
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    });
    // console.log('unLiked shopify', result.data);
    return result.data;
})

export const isLikedProduct = createAsyncThunk('likedProduct', async (slug) => {
    const result = await axios.post(`${baseurl}/is-liked-product`, {slug: slug}, {
        headers: {
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    });
    return result.data;
})

export const doLikeProduct = createAsyncThunk('doLike', async (product) => {
    console.log("#doLikeProduct", product);
    let products = product ? [product] : [];
    const anonymousLiked = localStorage.getItem('doLike');
    if(anonymousLiked !== null) {
        const items = JSON.parse(anonymousLiked);
        const locProduct = items.map((item, ind)=> {
            return {
                productId: item.productId?._id
            }
        })
        products = [...products, ...locProduct]
    } 
    // console.log("#doLikeProduct", products);
    const result = await axios.post(`${baseurl}/add-liked-product`, {data: products}, {
        headers: {
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    })
    localStorage.removeItem('doLike');
    return result.data;
})

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        getAnonymousLiked: (state, action) => {
            const anonymousLiked = localStorage.getItem('doLike');
            if(anonymousLiked === null){
                state.likedItems = []
            }else{
                state.likedItems = JSON.parse(anonymousLiked)
            }
        },
        doLike: (state, action) => {
            console.log(action.payload);
            // const product = action.payload.productId
            state.likedItems = [...state.likedItems, action.payload]
            localStorage.setItem('doLike', JSON.stringify(state.likedItems))
        },
        unLike: (state, action) => {
            const id = action.payload;
            const likedItems = JSON.parse(localStorage.getItem('doLike'));
            let ind;
            for(ind = 0; ind < likedItems.length; ind++){
                if(likedItems[ind].productId._id === id) break;
            }
            state.likedItems.splice(ind, 1);
            localStorage.setItem('doLike', JSON.stringify(state.likedItems));
        },
        isLikedLocal: (state, action) =>{
            const slug = action.payload.slug;
            const anonymousLiked = localStorage.getItem('doLike');
            let flag = false;
            if(anonymousLiked !== null){
                const likedItems = JSON.parse(anonymousLiked);
                likedItems.forEach(item=>{
                    if(item.productId?.slug === slug) flag = true;
                })
            }
            console.log("#isLikedLocal", flag);
            state.isLiked = flag;
        }
    },
    extraReducers: (builder)=>{
        // add to liked products 
        builder.addCase(doLikeProduct.pending, (state, action)=>{
            state.isLoading = true;
        })
        builder.addCase(doLikeProduct.fulfilled, (state, action)=>{
            state.isError = false;
            state.isLoading = false;
            state.likedItems = action.payload.products;
        })
        builder.addCase(doLikeProduct.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true;
        })

        // unlike products
        builder.addCase(unLikedProducts.pending, (state, action)=>{
            console.log('pending unlike');
            state.isLoading = true;
        })
        builder.addCase(unLikedProducts.fulfilled, (state, action)=>{
            console.log('fullfilled unlike', action.payload.products);
            state.isError = false;
            state.isLoading = false;
            state.likedItems = action.payload.products;
        })
        builder.addCase(unLikedProducts.rejected, (state, action)=>{
            console.log('error unlike');
            state.isLoading = false;
            state.isError = true;
        })
        
        // is liked product 
        builder.addCase(isLikedProduct.pending, (state, action)=>{
            console.log('pending isLiked');
            state.isLoading = true;
        })
        builder.addCase(isLikedProduct.fulfilled, (state, action)=>{
            console.log('fullfilled isLiked', action.payload.products);
            state.isError = false;
            state.isLoading = false;
            state.isLiked = action.payload.isLiked;
        })
        builder.addCase(isLikedProduct.rejected, (state, action)=>{
            console.log('error isLiked');
            state.isLoading = false;
            state.isError = true;
        })
        
    }
})

export const {doLike, unLike, getAnonymousLiked, isLikedLocal} = wishListSlice.actions;
export default wishListSlice.reducer