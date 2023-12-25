import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export const verifyEmail = createAsyncThunk('verifyEmail', async (data) => {
    // console.log(data);
    const response = await axios.post(`${baseurl}/api/user/verify-email/`, data)
    // console.log(response.data);
    return response.data
}) 

const verifyEmailSlice = createSlice({
    name: "verifyEmailSlice",
    initialState: {
        msg: '',
        status: false,
        token: '',
        isLoading: false,
        isError: false
    },
    extraReducers: (builder) => {
        // send email extrareducer
        builder.addCase(verifyEmail.pending, (state, action) => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.isLoading = false
            state.msg = action.payload.msg
            state.status = action.payload.status
        })
        builder.addCase(verifyEmail.rejected, (state, action) => {
            // console.log('Error', action.payload);
            state.msg = action.payload.msg
            state.isLoading = false
            state.isError = true
        })
    }
})

export default verifyEmailSlice.reducer