import { configureStore } from "@reduxjs/toolkit";
import drinksReducer from "./slices/drinksSlice";
import cartReducer from "./slices/cartSlice";
import favoritesReducer from "./slices/favoritesSlice";

const store = configureStore({
	reducer: {
		drinks: drinksReducer,
		cart: cartReducer,
		favorites: favoritesReducer,
	},
});

export default store;
