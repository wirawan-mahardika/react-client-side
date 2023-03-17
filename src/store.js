import { configureStore } from '@reduxjs/toolkit'
import authReducer from './actions/authSlice'
import cartReducer from './actions/cartSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
})