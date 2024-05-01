const sequelize = require('../../util/database');

const GroupTask = sequelize.define('groupTask', {
}, {
	timestamps: false
});

module.exports = GroupTask