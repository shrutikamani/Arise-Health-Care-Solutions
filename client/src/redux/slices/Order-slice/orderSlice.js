import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',  
    country: '',
    phoneNumber: ''
  },
  cartItems: [],
  totalAmount: 0,
  userId: null,
  orders: [] 
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    clearOrder: (state) => {
      state.shippingAddress = initialState.shippingAddress;
      state.cartItems = [];
      state.totalAmount = 0;
      state.userId = null;
    }
  }
});

export const { 
  setShippingAddress, 
  setCartItems, 
  setTotalAmount,
  setUserId,
  addOrder,
  clearOrder 
} = orderSlice.actions;

export default orderSlice.reducer;
