const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	FavoritesListItem: sequelize.define("favorites_list_items", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

		drink_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		picture: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}),
};