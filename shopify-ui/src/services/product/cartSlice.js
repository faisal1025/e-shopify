import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = "http://127.0.0.1:8001/api/product"


const initialState = {
  isLoading: false,
  isError: false,
  cartItems: [],
  total: 0,
  totalAmount: 0,
}

export const addCartItem= createAsyncThunk('addCartItem', async (product)=>{
  let products = product ? [product] : [];
  const localCartItem = localStorage.getItem('anonymousCart');
  if(localCartItem !== null) {
    const items = JSON.parse(localCartItem);
    const locProduct = items.map((item, ind)=> {
      return {
        qty: 1,
        productId: item._id
      }
    })
    products = [...products, ...locProduct]
  } 
  const result = await axios.post(`${baseurl}/add-to-cart`, { data: products }, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  localStorage.removeItem('anonymousCart');
  console.log("result added cart ", result.data);
  return result.data;
})


export const removeCartItem= createAsyncThunk('removeCartItem', async (data)=>{
  const result = await axios.delete(`${baseurl}/${data}/remove-to-cart`, {
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  });
  return result.data;
})


const addCartItemReducer = createReducer(initialState, (builder) => {
  builder.addCase(addCartItem.fulfilled, (state, action) => {})
})
const removeCartItemReducer = createReducer(initialState, (builder) => {
  builder.addCase(removeCartItem.fulfilled, (state, action) => {})
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getLocalCartItem: (state, action) => {
      const localCartItem = localStorage.getItem('anonymousCart');
      console.log(localCartItem);
      if(localCartItem === null) {
        state.cartItems = []
        state.total = 0
        state.totalAmount = 0
      }else {
        const items = JSON.parse(localCartItem);
        state.cartItems = items;
        state.total = items.length;
      }
    },
    add: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload.item]
      state.totalAmount += action.payload.item.price
      state.total += 1
      localStorage.setItem("anonymousCart", JSON.stringify(state.cartItems))
    },
    remove: (state, action) => {
        state.total -= 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartItem.pending, (state, action) => {
      console.log("pending");
      state.isLoading = true;
    })
    builder.addCase(addCartItem.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.isLoading = false;
      state.cartItems = action.payload?.content?.data[0]?.products || [];
      state.total = action.payload?.content?.meta?.total || 0;
      state.totalAmount = action.payload?.content?.meta?.totalAmount || 0;
    })
    builder.addCase(addCartItem.rejected, (state, action) => {
      console.log("failed");
      state.cartItems = action.payload?.content?.data || [];
      state.total = action.payload?.content?.meta?.total || 0;
      state.totalAmount = action.payload?.content?.meta?.totalAmount || 0;
      state.isLoading = false;
      state.isError = true;
    })
  }
})

// Action creators are generated for each case reducer function
export const { add, remove, getLocalCartItem } = cartSlice.actions

export default cartSlice.reducer