const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

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
	firstName: {
		type: STRING,
		allowNull: false,
	},
	lastName: {
		type: STRING,
		allowNull: false,
	},
	patronymic: {
		type: STRING,
		allowNull: true,
	},
})

module.exports = User