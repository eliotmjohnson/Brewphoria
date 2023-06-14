const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	Drinks: sequelize.define("drinks", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		drinks: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	}),
};
