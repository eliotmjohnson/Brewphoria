const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	DrinkCategories: sequelize.define("drink_categories", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		array: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	}),
};
