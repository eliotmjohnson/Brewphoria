const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	Cart: sequelize.define("carts", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
	}),
};
