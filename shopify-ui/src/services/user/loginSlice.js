

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = "http://127.0.0.1:8001/api/user"

export const loginUser = createAsyncThunk('loginUser', async (data) => {
    console.log(data);
    const response = await axios.post(`${baseurl}/login/`, data)
    localStorage.setItem('token', response.data.token)
    console.log(response.data);
    return response.data
}) 

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        msg: '',
        token: '',
        isLoading: false,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.msg = action.payload.msg
            state.token = action.payload.token
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isLoading = false
            state.isError = true
        })
    }
})

export default loginSlice.reducer

