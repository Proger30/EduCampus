const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Group = sequelize.define('group', {
	group: {
		type: STRING,
		allowNull: false,
		primaryKey: true,
	}
}
, {
	timestamps: false,
	indexes: [
		{
			unique: true,
			fields: ["advisor", "group"]
		}
	]
}
)

module.exports = Group