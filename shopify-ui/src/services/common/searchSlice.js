import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = `http://localhost:8001/api/product`;

const initialState = {
    isLoading: false,
    isError: false,
    data: null
}

export const getSearchResult = createAsyncThunk('searchResult', async (searchVal) => {
    const result = await axios.post(`${baseurl}/get-search-result`, {data: searchVal});
    console.log(result.data);
    return result.data;
})

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getSearchResult.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getSearchResult.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload;
        })
        builder.addCase(getSearchResult.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
        })
    }
})

export default searchSlice.reducer