const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	Order: sequelize.define("orders", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},

		order_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		date: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		time: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		address: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		items: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		total: {
			type: DataTypes.DECIMAL(18, 2),
			allowNull: false,
		},
	}),
};
