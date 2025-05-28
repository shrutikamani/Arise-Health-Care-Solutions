  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    items: [],
    products: [],  
  };

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const product = action.payload;
        const existing = state.items.find((item) => item._id === product._id);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({ ...product, quantity: 1 });
        }
      },

      removeFromCart: (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      },

      clearCart: (state) => {
        state.items = [];
      },

      increaseQty: (state, action) => {
        const item = state.items.find((item) => item._id === action.payload);
        if (item) {
          item.quantity += 1;
        }
      },

      decreaseQty: (state, action) => {
        const productId = action.payload;
      
        // Find the index of the product
        const index = state.items.findIndex((item) => item._id === productId);
        
        // If the item is found, adjust its quantity
        if (index !== -1) {
          const item = state.items[index];
          
          // If quantity is more than 1, decrease it
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // If quantity is 1 or below, remove it
            state.items.splice(index, 1); // Direct mutation with Immer
          }
        }
      }   
    },
  }); 

  export const {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQty,
    decreaseQty,
  } = cartSlice.actions;

  export default cartSlice.reducer;
