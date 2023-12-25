

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export const registerUser = createAsyncThunk('registerUser', async (data) => {
    const response = await axios.post(`${baseurl}/api/user/register/`, data)
    localStorage.setItem('token', response.data.token)
    return response.data
}) 

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        status: false,
        msg: '',
        token: '',
        isLoading: false,
        isError: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.msg = action.payload.msg
            state.token = action.payload.token
            state.status = action.payload.status
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            // console.log('Error', action.payload);
            state.isLoading = false
            state.isError = true
        })
    }
})

export default registerSlice.reducer

