import { createSlice } from "@reduxjs/toolkit";

const initialState = []
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload)
        },
        filterAndAdd: (state, action) => {
            const newCart = state.filter(item => item.name !== action.payload.name)
            return state = [action.payload, ...newCart]
        }
    }
})


export const { addToCart, filterAndAdd } = cartSlice.actions;
export default cartSlice.reducer