const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Schedule = sequelize.define('schedule', {
	day: {
		type: INTEGER,
	},
	hour: {
		type: STRING,
	},
	audience: {
		type: STRING,
	}
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