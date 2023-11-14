import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = "http://127.0.0.1:8001/api/product"

const initialState = {
    isLoading: false,
    isError: false,
    likedItems: [],
}

// export const getLikedProducts = createAsyncThunk('getLiked', async () => {
//     const result = await axios.get(`${baseurl}/get-liked-product`, {
//         headers: {
//             'Authorization': `bearer ${localStorage.getItem('token')}`
//         }
//     });
//     return result.data;
// })

export const doLikeProduct = createAsyncThunk('doLike', async (product) => {
    console.log("#doLikeProduct", product);
    let products = product ? [product] : [];
    const anonymousLiked = localStorage.getItem('doLike');
    if(anonymousLiked !== null) {
        const items = JSON.parse(anonymousLiked);
        const locProduct = items.map((item, ind)=> {
            return {
                productId: item._id
            }
        })
        products = [...products, ...locProduct]
    } 
    console.log("#doLikeProduct", products);
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
            console.log(action.payload.productId);
            const product = action.payload.productId
            state.likedItems = [...state.likedItems, product]
            localStorage.setItem('doLike', JSON.stringify(state.likedItems))
        },
        unLike: (state, action) => {
            const ind = action.payload.ind;
            state.likedItems.splice(ind, 1);
            localStorage.setItem('doLike', JSON.stringify(state.likedItems));
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


        // builder.addCase(getLikedProducts.pending, (state, action)=>{
        //     state.isLoading = true;
        // }),
        // builder.addCase(getLikedProducts.fulfilled, (state, action)=>{
        //     state.isError = false;
        //     state.isLoading = false;
        //     state.likedItems = action.payload.msg;
        // }),
        // builder.addCase(getLikedProducts.rejected, (state, action)=>{
        //     state.isLoading = false;
        //     state.isError = true;
        // })
    }
})

export const {doLike, unLike, anonymousLiked} = wishListSlice.actions;
export default wishListSlice.reducer