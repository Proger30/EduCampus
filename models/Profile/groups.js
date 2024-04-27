const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Group = sequelize.define('group', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	group: {
		type: STRING,
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

module.exports = Group