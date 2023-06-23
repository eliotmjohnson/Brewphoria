import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	refreshCart: false,
	cartOpen: false,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		setCartRefresh: (state, action) => {
			state.refreshCart = action.payload;
		},
		setCartOpen: (state, action) => {
			state.cartOpen = action.payload;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
