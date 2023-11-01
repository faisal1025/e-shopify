import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './product/cartSlice'
import registerReducer from './user/registerSlice'
import verifyEmailReducer from './user/verifyEmail'
import verifyOtpReducer from './user/verifyOtp'
import userReducer from './user/authSlice'
import loginReducer from './user/loginSlice'
import {getHomeProductReducer, getProductByCategoryReducer, getProductByIdReducer} from './product/productSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    register: registerReducer,
    verifyEmail: verifyEmailReducer,
    verifyOtp: verifyOtpReducer,
    user: userReducer,
    login: loginReducer,
    home: getHomeProductReducer,
    categoryProduct: getProductByCategoryReducer,
    idProduct: getProductByIdReducer
  },
})