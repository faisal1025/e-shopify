import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    users: [],
    pageNo: 0,
    itemPerPage: 5,
    result: null,
    totalItems: 0
}

const baseUrl = "http://127.0.0.1:8001/api/inventory";

export const getInventoryUsers = createAsyncThunk('inventoryUsers', async (data) => {
    const {page, itemPerPage} = data;
    const products = await axios.get(`${baseUrl}/users?page=${page}&row=${itemPerPage}`);
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
        changePage: (state, action) => {
            state.pageNo = action.payload.page;
        },
        setRowsPerPage: (state, action) => {
            state.itemPerPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInventoryUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.users = action.payload.data.users;  
            state.totalItems = action.payload.meta.totalItems;
        })
        builder.addCase(getInventoryUsers.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
    }
})

export const {incrementPage, decrementPage, changePage, setRowsPerPage} = inventoryUsersSlice.actions
export default inventoryUsersSlice.reducer