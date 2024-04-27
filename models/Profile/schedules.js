const { INTEGER } = require("sequelize");

const sequelize = require('../../util/database');

const Schedule = sequelize.define('schedule', {
	day: {
		type: INTEGER,
	},
}
, {
	indexes: [
		{
			unique: true,
			fields: ["userId", "moduleId", "day"]
		}
	]
}
)

module.exports = Schedule