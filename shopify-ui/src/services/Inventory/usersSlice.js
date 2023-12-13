import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    users: [],
    pageNo: 0,
    itemPerPage: 5
}

const baseUrl = "http://127.0.0.1:8001/api/inventory";

export const getInventoryUsers = createAsyncThunk('inventoryUsers', async (data) => {
    const {page} = data;
    const products = await axios.get(`${baseUrl}/users?page=${page}`);
    console.warn('#products', products.data);
    return products.data;
})

const inventoryUsersSlice = createSlice({
    name: 'inventoryUsers',
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
        builder.addCase(getInventoryUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.users = action.payload.data.users;  
        })
        builder.addCase(getInventoryUsers.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
    }
})

export const {incrementPage, decrementPage} = inventoryUsersSlice.actions
export default inventoryUsersSlice.reducer