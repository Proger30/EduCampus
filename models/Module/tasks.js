const { INTEGER, STRING, TEXT } = require("sequelize");

const sequelize = require('../../util/database');

const Task = sequelize.define('task', {
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
}
// , {
// 	indexes: [
// 		{
// 			unique: true,
// 			fields: ["userId", "role"]
// 		}
// 	]
// }
)

module.exports = Task