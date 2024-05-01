const { INTEGER } = require("sequelize");

const sequelize = require('../../util/database');

const ModuleGroup = sequelize.define('moduleGroup', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
}
, {
	timestamps: false,
	indexes: [
		{
			unique: true,
			fields: ["groupGroup", "moduleId"]
		}
	]
}
)

module.exports = ModuleGroup