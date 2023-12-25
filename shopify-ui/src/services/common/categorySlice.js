import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export const getCategories = createAsyncThunk('getcategory', async () => {
    const result = await axios.get(`${baseurl}/api/category`);
    // console.log(result.data);
    return result.data;
})

export const getCategoryProducts = createAsyncThunk('getCategoryProducts', async ({category, page}) => {
    // console.log('page', page);
    const result = await axios.get(`${baseurl}/api/category/${category}?page=${page}`);
    // console.log(result.data);
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
        setQty: (state, action) => {
            const {ind, val} = action.payload;
            state.categoryProducts.data[ind].curQty = val
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.category = action.payload?.data;
            // console.log('reducer category', action.payload?.data);
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
            action.payload.data = action.payload.data.map((product) => {
                return {...product, curQty: 1}
            })
            state.categoryProducts = action.payload;
        })
        builder.addCase(getCategoryProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

export const {setQty} = categorySlice.actions
export default categorySlice.reducer