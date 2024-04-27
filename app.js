const express = require("express");
const path = require('path');

require("dotenv").config({
	override: true,
	path: path.join(__dirname, 'dev.env')
});

const authRoutes = require('./router/auth.js');
const userRoutes = require('./router/user.js');

const sequelize = require("./util/database.js");

const GroupTask = require('./models/JunctionTable/GroupTask.js')
const GroupQuize = require('./models/JunctionTable/GroupQuize.js')

const {
	AcademicPerformance, 
	Grade, 
	Group, 
	Role, 
	Schedule, 
	User 
} = require('./models/Profile/index.js')

const {
	Material, 
	Module, 
	Quize, 
	Task
} = require('./models/Module/index.js');

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

// Profile
User.hasMany(AcademicPerformance)
Module.hasMany(AcademicPerformance)
AcademicPerformance.belongsTo(User)
AcademicPerformance.belongsTo(Module)

Group.belongsTo(User, {foreignKey: 'advisor'})

AcademicPerformance.hasMany(Grade)
Grade.belongsTo(AcademicPerformance)

User.hasMany(Role)
Role.belongsTo(User)

User.hasMany(Schedule)
Module.hasMany(Schedule)
Schedule.belongsTo(User)
Schedule.belongsTo(Module)

// Module

Module.hasMany(Task)
Module.hasMany(Quize)

Task.belongsTo(Module)
Task.hasMany(Material)

Task.belongsToMany(Group, {through: GroupTask})

Material.belongsTo(Task)

Quize.belongsTo(Module)

Quize.belongsToMany(Group, {through: GroupQuize})


// Group.belongsTo(Task)
Group.belongsToMany(Task, {through: GroupTask})

Group.belongsToMany(Quize, {through: GroupQuize})


// sequelize.sync({force: true})
sequelize.sync()
	.then(result => {
		app.listen(3000)
	})
	.catch(err => {
		console.log(err)
	})
