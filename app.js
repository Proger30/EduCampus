const express = require("express");
const path = require('path');

require("dotenv").config({
	override: true,
	path: path.join(__dirname, 'dev.env')
});


const sequelize = require("./util/database.js");
const User = require("./models/users.js");

const app = express()

app.use(express.json())


sequelize.sync({ force: true })
	.then(result => {
		app.listen(3000)
	})
	.catch(err => {
		console.log(err)
	})
