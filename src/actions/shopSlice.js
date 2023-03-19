import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addedToCart: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { addedToCart } = shopSlice.actions;
export default shopSlice.reducer;
