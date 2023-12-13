import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    pageNo: 0,
    itemPerPage: 5
}

const baseUrl = "http://127.0.0.1:8001/api/inventory";

export const getInventoryProducts = createAsyncThunk('inventoryProducts', async (data) => {
    const {page} = data;
    console.log('#page', page);
    const products = await axios.get(`${baseUrl}/products?page=${page}`);
    console.warn('#products', products.data);
    return products.data;
})

const inventoryProductsSlice = createSlice({
    name: 'inventoryProducts',
    initialState,
    reducers: {
        incrementPage: (state, action) => {
            state.pageNo += 1;
        },
        decrementPage: (state, action) => {
            state.pageNo -= 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInventoryProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload.data.products;  
            console.log("products", action.payload.data.products);
        })
        builder.addCase(getInventoryProducts.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
    }
})

export const {incrementPage, decrementPage} = inventoryProductsSlice.actions
export default inventoryProductsSlice.reducer