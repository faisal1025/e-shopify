import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    totalItems: 0,
    pageNo: 0,
    itemPerPage: 5,
    result: null
}

const baseurl = process.env.REACT_APP_BASE_URL

export const getInventoryProducts = createAsyncThunk('inventoryProducts', async (data) => {
    const {page, itemPerPage} = data;
    // console.log('#page', page);
    const products = await axios.get(`${baseurl}/api/inventory/products?page=${page}&row=${itemPerPage}`);
    // console.warn('#products', products.data);
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
    // console.warn('#products', products.data);
    return products.data;
})

export const removeProductAsync = createAsyncThunk('removeProduct', async (data) => {
    const {slug} = data;
    const result = await axios.delete(`${baseurl}/api/inventory/products?slug=${slug}`)
    return result.data;
})

export const updateProductAsync = createAsyncThunk('updateProduct', async (data) => {
    const {id, values} = data;
    let fromData = new FormData()
    fromData.append('name', values.name)
    fromData.append('subTitle', values.subTitle)
    fromData.append('price', values.price)
    fromData.append('originalPrice', values.originalPrice)
    fromData.append('brand', values.brand)
    fromData.append('qty', values.quantity)
    fromData.append('category', values.category)
    fromData.append('description', values.description)
    fromData.append('thumbnail', values.thumbnail)
    fromData.append('id', id)
    for(let i = 0; i < values.images?.length; i++){
        fromData.append(`photos`, values.images[i])
    }
    const result = await axios.put(`${baseurl}/api/inventory/products`, fromData)
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
        changePage: (state, action) => {
            state.pageNo = action.payload.page;
        },
        setRowsPerPage: (state, action) => {
            state.itemPerPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInventoryProducts.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getInventoryProducts.fulfilled, (state, action) => {
            // console.log("products", action.payload);
            state.isLoading = false;
            state.isError = false;
            state.products = action.payload.data.products;
            state.totalItems = action.payload.meta.totalItems;
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
            state.result = action.payload
        })
        // remove
        builder.addCase(removeProductAsync.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(removeProductAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.result = action.payload
        })
        // update
        builder.addCase(updateProductAsync.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(updateProductAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.result = action.payload
        }) 
    }
})

export const {incrementPage, decrementPage, changePage, setRowsPerPage} = inventoryProductsSlice.actions
export default inventoryProductsSlice.reducer