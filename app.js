const express = require("express");
const path = require('path');

// const session = require('express-session');
// const Sequelize = require("sequelize");

// const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("dotenv").config({
	override: true,
	path: path.join(__dirname, 'dev.env')
});

const authRoutes = require('./router/auth.js');
const userRoutes = require('./router/user.js');

const sequelize = require("./util/database.js");

const app = express()

app.use(express.json())
// app.use(
// 	session({
// 	  secret: process.env.SECRET_KEY,
// 	  store: new SequelizeStore({
// 		db: sequelize,
// 	  }),
// 	  resave: false,
// 	  saveUninitialized: false,
// 	  proxy: true,
// 	})
// );


app.use(authRoutes)
app.use(userRoutes)

sequelize.sync({force: true})
// sequelize.sync()
	.then(result => {
		app.listen(3000)
	})
	.catch(err => {
		console.log(err)
	})
