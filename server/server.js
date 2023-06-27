// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ViteExpress = require("vite-express");

const { sequelize } = require("./database/database");
const { User } = require("./models/user");
const { Cart } = require("./models/cart");
const { CartItem } = require("./models/cartItem");
const { FavoritesList } = require("./models/favoritesList");
const { FavoritesListItem } = require("./models/favoritesListItem");
const { Order } = require("./models/order");

// Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Relations
User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User, { onDelete: "CASCADE" });
Cart.hasMany(CartItem, { as: "CartItems", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { onDelete: "CASCADE" });
User.hasOne(FavoritesList, {
	as: "FavoritesList",
	foreignKey: "userId",
	onDelete: "CASCADE",
});
FavoritesList.belongsTo(User, { onDelete: "CASCADE" });
FavoritesList.hasMany(FavoritesListItem, {
	as: "FavoritesListItems",
	onDelete: "CASCADE",
});
FavoritesListItem.belongsTo(FavoritesList, { onDelete: "CASCADE" });
User.hasMany(Order, { as: "Orders", onDelete: "CASCADE" });
Order.belongsTo(User, { onDelete: "CASCADE" });

// Routes
require("./routes/routes")(app);

// Database and Server
const { PORT } = process.env;
// ViteExpress.config({ mode: "production" });

sequelize
	.sync()
	.then(() => {
		ViteExpress.listen(app, PORT, () =>
			console.log(`DB synced and server running on port ${PORT}`)
		);
	})
	.catch((err) => console.error(err));
