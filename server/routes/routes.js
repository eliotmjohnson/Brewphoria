const { register, login, getTokenData } = require("../controllers/auth");
const { filterDrinks, getDrinks } = require("../controllers/drinkFilter");
const { isAuthenticated } = require("../middleware/isAuthenticated");

module.exports = (app) => {
	// Auth
	app.post("/register", register);
	app.post("/login", login);
	app.post("/getData", getTokenData);

	// Drink Filter
	app.post("/filterDrinks", filterDrinks);
	app.get("/getDrinks", getDrinks);
};
