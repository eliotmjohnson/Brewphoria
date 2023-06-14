const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database");

module.exports = {
	Users: sequelize.define("users", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hashed_password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}),
};
