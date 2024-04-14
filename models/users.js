const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../util/database');

const User = sequelize.define('user', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	password: {
		type: STRING,
		allowNull: false,
	},
	name: {
		type: STRING,
		allowNull: false,
	}
})

module.exports = User