
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export const getProductByCategory = createAsyncThunk('getProductByCategory', async (data) => {
    const response = await axios.get(`${baseurl}/api/product/${data}/products`)
    return response.data;
})


export const getProductByCategoryReducer = createReducer(
    {
        isLoading: false,
        isError: false,
        data: null
    }, 
    (builder) => {
        builder.addCase(getProductByCategory.pending, (state, action) => {
            state.isLoading = true;    
        })
        builder.addCase(getProductByCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload
        })
        builder.addCase(getProductByCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.data = action.payload
        })
    }
)

export const getHomeProduct = createAsyncThunk("getHomeProduct", async () => {
    const response = await axios.get(`${baseurl}/api/product/climbing-shoe/products`)
    return response.data;
})

export const getHomeProductReducer = createReducer(
    {
        isLoading: false,
        isError: false,
        data: null
    },
    (builder) => {
        builder.addCase(getHomeProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getHomeProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload
        })
        builder.addCase(getHomeProduct.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.data = action.payload
        })
    }
)

export const getProductById = createAsyncThunk("getProductById", async (slug) => {
    const response = await axios.get(`${baseurl}/api/product/${slug}/product`)
    return response.data;
})

export const getProductByIdReducer = createReducer(
    {
        isLoading: false,
        isError: false,
        data: null
    },
    (builder) => {
        builder.addCase(getProductById.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload
        })
        builder.addCase(getProductById.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.data = action.payload
        })
    }
)
