const { INTEGER, DATEONLY } = require("sequelize");

const sequelize = require('../../util/database');

const Grade = sequelize.define('grade', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	date: {
		type: DATEONLY,
		allowNull: false,
	},
	grade: {
		type: INTEGER,
		allowNull: false,
	},
}
, {
	indexes: [
		{
			unique: true,
			fields: ["academicPerformanceId", "date"]
		}
	]
}
)

module.exports = Grade