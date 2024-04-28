const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Role = sequelize.define('role', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	role: {
		type: STRING,
		allowNull: false,
	},
}
, {
	indexes: [
		{
			unique: true,
			fields: ["userId", "role"]
		}
	],
	timestamps: false
}
)

module.exports = Role