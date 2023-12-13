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
import categoryReducer from './common/categorySlice'
import inventoryProductsReducer from './Inventory/productsSlice'
import inventoryCategoriesReducer from './Inventory/categoriesSlice'
import inventoryUsersReducer from './Inventory/usersSlice'
import {getHomeProductReducer, getProductByCategoryReducer, getProductByIdReducer} from './product/productSlice'

export const store = configureStore({
  reducer: {
    inventoryProducts: inventoryProductsReducer,
    inventoryCategories: inventoryCategoriesReducer,
    inventoryUsers: inventoryUsersReducer,
    category: categoryReducer,
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