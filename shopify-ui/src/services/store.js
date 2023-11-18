import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './common/searchSlice'
import cartReducer from './product/cartSlice'
import orderReducr from './product/orderSlice'
import wishListReducer from './product/wishListSlice'
import registerReducer from './user/registerSlice'
import verifyEmailReducer from './user/verifyEmail'
import verifyOtpReducer from './user/verifyOtp'
import userReducer from './user/authSlice'
import loginReducer from './user/loginSlice'
import {getHomeProductReducer, getProductByCategoryReducer, getProductByIdReducer} from './product/productSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    order: orderReducr,
    wishList: wishListReducer,
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