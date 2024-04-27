const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Quize = sequelize.define('quize', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	quizeData: {
		type: STRING,
		allowNull: false,
	},
	
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

module.exports = Quize