const {
	register,
	login,
	updatePassword,
	getTokenData,
	deleteAccount,
} = require("../controllers/auth");
const {
	addToFavorites,
	getFavoritesList,
	deleteFavorite,
} = require("../controllers/favoritesList");
const { addToOrders, getOrders } = require("../controllers/orders");
const { filterDrinks, getDrinks } = require("../controllers/drinkFilter");
const { addToCart, getCart, updateCart } = require("../controllers/cart");
const { isAuthenticated } = require("../middleware/isAuthenticated");

module.exports = (app) => {
	// Auth
	app.post("/register", register);
	app.post("/login", login);
	app.post("/updatePassword/:id", isAuthenticated, updatePassword);
	app.post("/getData", getTokenData);
	app.delete("/deleteAccount/:id", isAuthenticated, deleteAccount);

	// Drink Filter
	app.post("/filterDrinks", isAuthenticated, filterDrinks);
	app.get("/getDrinks/:id", isAuthenticated, getDrinks);

	// Cart
	app.post("/addToCart/:id", isAuthenticated, addToCart);
	app.get("/getCart/:id", isAuthenticated, getCart);
	app.put("/updateCart", isAuthenticated, updateCart);

	// Favorites List
	app.post("/addToFavorites/:id", isAuthenticated, addToFavorites);
	app.get("/getFavoritesList/:id", isAuthenticated, getFavoritesList);
	app.put("/deleteFavorite/:id", isAuthenticated, deleteFavorite);

	// Orders
	app.post("/addToOrders/:id", isAuthenticated, addToOrders);
	app.get("/getOrders/:id", isAuthenticated, getOrders);
};
