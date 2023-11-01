import jwt_decode from "jwt-decode";
 
import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token')

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: token ? true : false,
        user: token ? jwt_decode(token) : {}
    },
    reducers: {
        updateAuth: (state, action) => {
            const token = localStorage.getItem('token')
            state.isAuthenticated = token ? true : false
            state.user = token ? jwt_decode(token) : {}
        },
        logoutUser: (state, action) => {
            localStorage.removeItem('token')
            state.isAuthenticated = false
            state.user = {}
        }
    }
})
export const {updateAuth, logoutUser} = userSlice.actions
export default userSlice.reducer