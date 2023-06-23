const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	FavoritesList: sequelize.define("favorites_lists", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
	}),
};
