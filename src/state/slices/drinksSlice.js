import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	drinksArr: [],
	loading: false,
};

const drinksSlice = createSlice({
	name: "drinks",
	initialState: initialState,
	reducers: {
		setDrinksArr: (state, action) => {
			state.drinksArr = action.payload;
		},

		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const drinksActions = drinksSlice.actions;

export default drinksSlice.reducer;
