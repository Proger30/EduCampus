const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Module = sequelize.define('module', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: STRING,
		allowNull: false,
	},
	description: {
		type: STRING,
		allowNull: false,
	}
})

module.exports = Module