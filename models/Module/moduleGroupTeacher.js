const { INTEGER } = require("sequelize");

const sequelize = require('../../util/database');

const ModuleGroupTeacher = sequelize.define('moduleGroupTeacher', {
}
, {
	timestamps: false,
	indexes: [
		{
			unique: true,
			fields: ["moduleGroupId", "teacherId"]
		}
	]
}
)

module.exports = ModuleGroupTeacher