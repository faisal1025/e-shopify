import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    isLoading: false,
    isError: false,
    categories: [],
    totalItems: 0,
    pageNo: 0,
    itemPerPage: 5,
    result: null
}

const baseurl = process.env.REACT_APP_BASE_URL

export const getInventoryCategories = createAsyncThunk('inventoryCategories', async (data) => {
    const {page, itemPerPage} = data;
    const products = await axios.get(`${baseurl}/api/inventory/categories?page=${page}&row=${itemPerPage}`);
    console.warn('#products', products.data);
    return products.data;
})

export const addInventoryCategories = createAsyncThunk("addInventoryCategories", async (data) => {
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('thumbnail', data.thumbnail)
    const result = await axios.post(`${baseurl}/api/inventory/categories`, formData);
    console.log("#category added", result.data);
    return result.data;
})

export const removeCategoryAsync = createAsyncThunk('removeCategory', async (data, thunkAPI) => {
    const {slug} = data;
    const result = await axios.delete(`${baseurl}/api/inventory/categories?slug=${slug}`)
    return result.data;
})

export const updateCategoryAsync = createAsyncThunk('updateCategory', async (data) => {
    const {id, values} = data;
    const formData = new FormData();
    formData.append('name', values.name)
    formData.append('thumbnail', values.thumbnail)
    formData.append('id', id)
    const result = await axios.put(`${baseurl}/api/inventory/categories`, formData)
    return result.data;
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
        changePage: (state, action) => {
            state.pageNo = action.payload.page;
        },
        setRowsPerPage: (state, action) => {
            state.itemPerPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInventoryCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.categories = action.payload.data.categories;
            state.totalItems = action.payload.meta.totalItems;  
        })
        builder.addCase(getInventoryCategories.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
        })
        // adding
        builder.addCase(addInventoryCategories.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(addInventoryCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.result = action.payload;
        })
        // remove
        builder.addCase(removeCategoryAsync.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(removeCategoryAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.result = action.payload;
        })
        // update
        builder.addCase(updateCategoryAsync.pending, (state, action) => {
            state.isLoading = true;
        }) 
        builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.result = action.payload;
        })
    }
})

export const {incrementPage, decrementPage, changePage, setRowsPerPage} = inventoryCategoriesSlice.actions
export default inventoryCategoriesSlice.reducer