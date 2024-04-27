const { INTEGER, DATEONLY } = require("sequelize");

const sequelize = require('../../util/database');

const AcademicPerformance = sequelize.define('academicPerformance', {
	id: {
		type: INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	course: {
		type: INTEGER,
		allowNull: false,
	},
}
, {
	indexes: [
		{
			unique: true,
			fields: ["userId", "moduleId", "course"]
		}
	]
}
)

module.exports = AcademicPerformance