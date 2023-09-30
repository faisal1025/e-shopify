import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  total: 0,
  totalAmount: 0,
  cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
        console.log(action.payload);
        state.cartItems = [...state.cartItems, action.payload.item]
        state.totalAmount += action.payload.item.price
        state.total += 1
    },
    remove: (state, action) => {
        state.total -= 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = cartSlice.actions

export default cartSlice.reducer