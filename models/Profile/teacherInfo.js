const { INTEGER, STRING } = require("sequelize");

const sequelize = require('../../util/database');

const Teacher = sequelize.define('teacher', {
	email: {
		type: STRING,
	}, // todo вынести в отдельную таблицу факультеты
	phone: {
		type: STRING,
		allowNull: false,
	}, // todo вынести в отдельную таблицу факультеты
}, 
{timestamps: false,}
)

module.exports = Teacher