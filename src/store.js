import { configureStore } from '@reduxjs/toolkit'
import authReducer from './actions/authSlice'
import cartReducer from './actions/cartSlice'
import shopReducer from "./actions/shopSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    shop: shopReducer,
  },
});