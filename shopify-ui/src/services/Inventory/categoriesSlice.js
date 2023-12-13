import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    categories: [],
    pageNo: 0,
    itemPerPage: 5
}

const baseUrl = "http://127.0.0.1:8001/api/inventory";

export const getInventoryCategories = createAsyncThunk('inventoryCategories', async (data) => {
    const {page} = data;
    const products = await axios.get(`${baseUrl}/categories?page=${page}`);
    console.warn('#products', products.data);
    return products.data;
})

const inventoryCategoriesSlice = createSlice({
    name: 'inventoryCategories',
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
        builder.addCase(getInventoryCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.categories = action.payload.data.categories;  
        })
        builder.addCase(getInventoryCategories.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
    }
})

export const {incrementPage, decrementPage} = inventoryCategoriesSlice.actions
export default inventoryCategoriesSlice.reducer