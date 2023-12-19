import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    pageNo: 0,
    itemPerPage: 5
}

const baseurl = process.env.REACT_APP_BASE_URL

export const getInventoryProducts = createAsyncThunk('inventoryProducts', async (data) => {
    const {page} = data;
    console.log('#page', page);
    const products = await axios.get(`${baseurl}/api/inventory/products?page=${page}`);
    console.warn('#products', products.data);
    return products.data;
})

export const addInventoryProducts = createAsyncThunk('addInventoryProducts', async (data) => {
    let fromData = new FormData()
    fromData.append('name', data.name)
    fromData.append('subTitle', data.subTitle)
    fromData.append('price', data.price)
    fromData.append('originalPrice', data.originalPrice)
    fromData.append('brand', data.brand)
    fromData.append('qty', data.quantity)
    fromData.append('category', data.category)
    fromData.append('description', data.description)
    fromData.append('thumbnail', data.thumbnail)
    for(let i = 0; i < data.images.length; i++){
        fromData.append(`photos`, data.images[i])
    }

    const products = await axios.post(`${baseurl}/api/inventory/products`, fromData);
    console.warn('#products', products.data);
    return products.data;
})

export const removeProductAsync = createAsyncThunk('removeCategory', async (data) => {
    const {slug} = data;
    const result = await axios.delete(`${baseurl}/api/inventory/products?slug=${slug}`)
    return result.data;
})

export const updateProductAsync = createAsyncThunk('updateCategory', async (data) => {
    const {id, values} = data;
    const formData = new FormData();
    formData.append('name', values.name)
    formData.append('thumbnail', values.thumbnail)
    formData.append('id', id)
    const result = await axios.put(`${baseurl}/api/inventory/products`, formData)
    return result.data;
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
        // adding
        builder.addCase(addInventoryProducts.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(addInventoryProducts.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        // remove
        builder.addCase(removeProductAsync.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(removeProductAsync.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        // update
        builder.addCase(updateProductAsync.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(updateProductAsync.fulfilled, (state, action) => {
            state.isLoading = false;
        }) 
    }
})

export const {incrementPage, decrementPage} = inventoryProductsSlice.actions
export default inventoryProductsSlice.reducer