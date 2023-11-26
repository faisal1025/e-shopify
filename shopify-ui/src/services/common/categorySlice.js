import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export const getCategories = createAsyncThunk('getcategory', async () => {
    const result = await axios.get(`${baseurl}/api/category`);
    // console.log(result.data);
    return result.data;
})

export const getCategoryProducts = createAsyncThunk('getCategoryProducts', async (slug) => {
    const result = await axios.get(`${baseurl}/api/category/${slug}`);
    console.log(result.data);
    return result.data;
})

const initialState = {
    isLoading: false,
    isError: false,
    category: null,
    categoryProducts: null
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.category = action.payload?.data;
            console.log('reducer category', action.payload?.data);
        })
        builder.addCase(getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })

        // getting category products
        builder.addCase(getCategoryProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCategoryProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.categoryProducts = action.payload;
        })
        builder.addCase(getCategoryProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export default categorySlice.reducer