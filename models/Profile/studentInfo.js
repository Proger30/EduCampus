const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Student = sequelize.define('student', {
	faculty: {
		type: STRING,
		allowNull: false,
	}, // todo вынести в отдельную таблицу факультеты
	specialization: {
		type: STRING,
		allowNull: false,
	}, // todo вынести в отдельную таблицу факультеты
	course: {
		type: INTEGER,
		allowNull: false,
	},
	
}, 
{timestamps: false,}
)

module.exports = Student