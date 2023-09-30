import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const baseurl = "http://127.0.0.1:8001/api/user"

export const verifyEmail = createAsyncThunk('verifyEmail', async (data) => {
    console.log(data);
    const response = await axios.post(`${baseurl}/verify-email/`, data)
    console.log(response.data);
    return response.data
}) 

const verifyEmailSlice = createSlice({
    name: "verifyEmailSlice",
    initialState: {
        msg: '',
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
        })
        builder.addCase(verifyEmail.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.msg = action.payload.msg
            state.isLoading = false
            state.isError = true
        })
    }
})

export default verifyEmailSlice.reducer