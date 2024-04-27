const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Material = sequelize.define('material', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	path: {
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

module.exports = Material