const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	DrinkBases: sequelize.define("drink_bases", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		base: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		array: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	}),
};
