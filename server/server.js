// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const ViteExpress = require("vite-express");

const { sequelize } = require("./database/database");
const { User } = require("./models/user");
const { Cart } = require("./models/cart");
const { CartItem } = require("./models/cartItem");

// Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Relations
User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User, { onDelete: "CASCADE" });
Cart.hasMany(CartItem, { onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { onDelete: "CASCADE" });

// Routes
require("./routes/routes")(app);

// Database and Server
const { PORT } = process.env;

sequelize
	.sync()
	.then(() => {
		ViteExpress.listen(app, PORT, () =>
			console.log(`DB synced and server running on port ${PORT}`)
		);
	})
	.catch((err) => console.error(err));
