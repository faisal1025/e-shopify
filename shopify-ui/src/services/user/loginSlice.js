import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export const loginUser = createAsyncThunk('loginUser', async (data) => {
    // console.log(data);
    const response = await axios.post(`${baseurl}/api/user/login/`, data)
    localStorage.setItem('token', response.data.token)
    // console.log(response.data);
    return response.data
}) 

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        status: false,
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
            state.status = action.payload.status
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            // console.log('Error', action.payload);
            state.isLoading = false
            state.isError = true
        })
    }
})

export default loginSlice.reducer

