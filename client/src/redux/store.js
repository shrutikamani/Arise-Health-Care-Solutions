import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { combineReducers } from "redux";

import ariseReducer from "./slices/ariseSlice";
import cartReducer from "./slices/Product-slice/cartSlice";
import orderReducer from "./slices/Order-slice/orderSlice";
const rootReducer = combineReducers({
  arise: ariseReducer,
  cart: cartReducer,
  order: orderReducer,

});

// 2. Create persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "order"], // Only persist cart and order slices
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
