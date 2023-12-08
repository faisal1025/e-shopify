import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseurl = "http://127.0.0.1:8001/api/product"


const initialState = {
  isLoading: false,
  isError: false,
  cartItems: [],
  total: 0,
  totalAmount: 0,
}

export const selectQtyAuth = createAsyncThunk('selectQtyAuth', async(data) => {
  console.log(data);
  const result = await axios.post(`${baseurl}/change-qty`, data, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return result.data
})

export const addCartItem= createAsyncThunk('addCartItem', async (product)=>{
  let products = product ? [product] : [];
  const localCartItem = localStorage.getItem('anonymousCart');
  if(localCartItem !== null) {
    const items = JSON.parse(localCartItem);
    const locProduct = items.map((item, ind)=> {
      return {
        qty: item.qty,
        productId: item.productId._id
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
  // console.log("result added cart ", result.data);
  return result.data;
})


export const removeCartItem= createAsyncThunk('removeCartItem', async (productId)=>{
  const result = await axios.delete(`${baseurl}/${productId}/remove-from-cart`, {
    headers: {
      Authorization: `bearer ${localStorage.getItem('token')}`
    }
  });
  // console.log("removeCart", result.data);
  return result.data;
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getLocalCartItem: (state, action) => {
      const localCartItem = localStorage.getItem('anonymousCart');
      if(localCartItem === null) {
        state.cartItems = []
        state.total = 0
        state.totalAmount = 0
      }else {
        const items = JSON.parse(localCartItem);
        state.cartItems = items;
        state.total = items.length;
        let sum = 0;
        items.forEach((item, ind) => {
          sum += (item.qty*item.productId?.price);
        })
        state.totalAmount = sum;
      }
    },
    add: (state, action) => {
      console.log("add : ", action.payload.item.productId);
      state.cartItems = [...state.cartItems, action.payload.item]
      state.totalAmount += action.payload.item?.productId?.price
      state.total += 1
      localStorage.setItem("anonymousCart", JSON.stringify(state.cartItems))
    },
    remove: (state, action) => {
        const ind = action.payload.ind;
        const product = action.payload.item;
        state.totalAmount -= product.price;
        state.cartItems.splice(ind, 1);
        localStorage.setItem("anonymousCart", JSON.stringify(state.cartItems))
        state.total -= 1
    },
    selectQty: (state, action) => {
        const id = action.payload.id;
        const qty = action.payload.qty;
        const localCartItem = localStorage.getItem('anonymousCart');
        if(localCartItem === null) {
          state.cartItems = []
          state.total = 0
          state.totalAmount = 0
        }else {
          const items = JSON.parse(localCartItem);
          let sum = 0;
          items.forEach((item, ind) => {
            if (item.productId?._id === id){
              item.qty = qty;
            } 
            sum += (item.qty*item.productId?.price);
          })
          state.cartItems = items;
          state.total = items.length;
          state.totalAmount = sum;
          localStorage.setItem("anonymousCart", JSON.stringify(state.cartItems))
        }
    }
  },
  extraReducers: (builder) => {
    // for add cart items
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

    // for remove cart items
    builder.addCase(removeCartItem.pending, (state, action)=>{
      console.log('remove_pending');
      state.isLoading = true;
    })
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.isLoading = false;
      state.cartItems = action.payload?.content?.data[0]?.products || [];
      state.total = action.payload?.content?.meta?.total || 0;
      state.totalAmount = action.payload?.content?.meta?.totalAmount || 0;
    })
    builder.addCase(removeCartItem.rejected, (state, action) => {
      console.log("failed");
      state.cartItems = action.payload?.content?.data || [];
      state.total = action.payload?.content?.meta?.total || 0;
      state.totalAmount = action.payload?.content?.meta?.totalAmount || 0;
      state.isLoading = false;
      state.isError = true;
    })
    
    //setQty
    builder.addCase(selectQtyAuth.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(selectQtyAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.cartItems = action.payload.content?.data;
      state.total = action.payload.content?.meta?.total;
      state.totalAmount = action.payload.content?.meta?.totalAmount;
    })
    builder.addCase(selectQtyAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
  }
})

// Action creators are generated for each case reducer function
export const { add, remove, getLocalCartItem, selectQty } = cartSlice.actions

export default cartSlice.reducer