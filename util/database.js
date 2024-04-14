const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {dialect: 'postgres', host: process.env.HOST, port: process.env.PORT});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
 }).catch((error) => {
	console.error('Unable to connect to the database: ', error);
 });

module.exports = sequelize