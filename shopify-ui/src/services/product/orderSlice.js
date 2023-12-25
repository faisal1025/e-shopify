import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

const initialState = {
    isLoading: false,
    isError: false,
    data: null
}

export const checkout = createAsyncThunk('checkout', async (amount) => {
    const result = await axios.post(`${baseurl}/api/product/checkout`, {amount: amount}, {
        headers: {
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    })
    // console.log('# checkout result', result);
    return result.data;
})

export const gettingOrders = createAsyncThunk('gettingOrders', async () => {
    const result = await axios.get(`${baseurl}/api/product/getOrders`, {
        headers: {
            'Authorization': `bearer ${localStorage.getItem('token')}`
        }
    })
    return result.data;
})

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // checkout reducers
        builder.addCase(checkout.pending, (state, action) => {
            // console.log('#checkout pending', action.payload);
            state.isLoading = true;
        })
        builder.addCase(checkout.fulfilled, (state, action) => {
            // console.log('#checkout fulfilled', action.payload);
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload;
        })
        builder.addCase(checkout.rejected, (state, action) =>{
            // console.log('#checkout rejected', action.payload);
            state.isLoading = false;
            state.isError = true;
        })
        // checkout reducers end

        // getting orders reducers
        builder.addCase(gettingOrders.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(gettingOrders.fulfilled, (state, action) => {
            // console.log("getting orderd fullfilled", action.payload);
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload;
        })
        builder.addCase(gettingOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
        // getting orders reducers
    }
})

export default orderSlice.reducer