// Imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const ViteExpress = require("vite-express");

const { sequelize } = require("./database/database");
const { DrinkBases } = require("./models/drinkBases");
const { Drinks } = require("./models/drinks");

// Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Relations

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
