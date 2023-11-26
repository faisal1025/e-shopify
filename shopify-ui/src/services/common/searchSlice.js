import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseurl = `http://localhost:8001/api/product`;

const initialState = {
    isLoading: false,
    isError: false,
    searchVal: null,
    page: 0,
    data: null
}

export const getSearchResult = createAsyncThunk('searchResult', async ({searchVal, page}) => {
    // console.log(searchVal, page);
    const result = searchVal && await axios.post(`${baseurl}/get-search-result?page=${page}`, {searchVal: searchVal});
    console.log("#search result : ", result.data);
    return result.data;
})

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        changePage : (state, action) => {
            state.page = action.payload;
        },
        nextPage : (state, action) => {
            state.page += 1;
        },
        previousPage : (state, action) => {
            state.page -= 1;
        },
        updateSearchText: (state, action) => {
            state.searchVal = action.payload
        }
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
export const {changePage, previousPage, nextPage, updateSearchText} = searchSlice.actions
export default searchSlice.reducer