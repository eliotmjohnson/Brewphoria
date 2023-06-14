import { configureStore } from "@reduxjs/toolkit";
import drinksReducer from "./slices/drinksSlice";

const store = configureStore({
	reducer: {
		drinks: drinksReducer,
	},
});

export default store;
