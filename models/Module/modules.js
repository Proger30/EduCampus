const { INTEGER, STRING, TEXT } = require("sequelize");

const sequelize = require('../../util/database');

const Module = sequelize.define('module', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	subject: {
		type: STRING,
		allowNull: false,
	},
	description: {
		type: TEXT,
		allowNull: false,
	}
})

module.exports = Module