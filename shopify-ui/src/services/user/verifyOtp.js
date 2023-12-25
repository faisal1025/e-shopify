import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL

export const verifyOtp = createAsyncThunk('verifyOtp', async (data) => {
    // console.log(data);
    const response = await axios.post(`${baseurl}/api/user/verify-otp/`, data)
    return response.data
}) 

const verifyOtpSlice = createSlice({
    name: "verifyOtpSlice",
    initialState: {
        msg: '',
        status: false,
        token: '',
        isLoading: false,
        isError: false
    },
    extraReducers: (builder) => {
        // send email extrareducer
        builder.addCase(verifyOtp.pending, (state, action) => {
            state.isLoading = true
            state.isError = false
        })
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false
            state.msg = action.payload.msg
            state.status = action.payload.status
        })
        builder.addCase(verifyOtp.rejected, (state, action) => {
            // console.log('Error', action.payload);
            state.isLoading = false
            state.isError = true
        })
    }
})

export default verifyOtpSlice.reducer