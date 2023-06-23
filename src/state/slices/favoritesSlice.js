import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	favoritesList: [],
};

const favoritesSlice = createSlice({
	name: "favorites",
	initialState: initialState,
	reducers: {
		setFavorites: (state, action) => {
			state.favoritesList = action.payload;
		},
	},
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice.reducer;
