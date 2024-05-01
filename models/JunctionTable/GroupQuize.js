const sequelize = require('../../util/database');

const GroupQuize = sequelize.define('groupQuize', {
}, {
	timestamps: false
});

module.exports = GroupQuize