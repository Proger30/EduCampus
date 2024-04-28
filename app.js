const express = require("express");
const path = require('path');
const bcrypt = require('bcryptjs')

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
	User,
	Student,
	Teacher
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

User.hasOne(Student)
Student.belongsTo(User)

User.hasOne(Teacher)
Teacher.belongsTo(User)
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


sequelize.sync({force: true})
// sequelize.sync()
	.then(async (result) => {
		
		const hashedPassword = await bcrypt.hash('password', 12)

		await sequelize.query(`
		insert into users ("id", "lastName", "firstName", "patronymic", "password", "createdAt", "updatedAt") values (29323, 'Zholdybai', 'Sultanbi', 'Zholdybaiuly', '${hashedPassword}', pg_catalog.now(), pg_catalog.now());
		insert into users ("id", "lastName", "firstName", "patronymic", "password", "createdAt", "updatedAt") values (29273, 'Shakuali', 'Zhansaya', 'Dauletkyzy', '${hashedPassword}', pg_catalog.now(), pg_catalog.now());
		insert into users ("id", "lastName", "firstName", "patronymic", "password", "createdAt", "updatedAt") values (29272, 'Shakuali', 'Aizere', 'Dauletkyzy', '${hashedPassword}', pg_catalog.now(), pg_catalog.now());
	
		insert into roles ("role", "userId") values ('Student', 29323);
		insert into roles ("role", "userId") values ('Student', 29273);
		insert into roles ("role", "userId") values ('Teacher', 29272);
		
		insert into students  (faculty, specialization , "userId") values ('FDT', 'Infomation Systems', 29323);
		insert into students  (faculty, specialization , "userId") values ('FKT', 'Infomation Systems', 29273);
		insert into teachers  (phone, "userId") values ('+77084997639', 29272);
		`)
		
		app.listen(3000)
	})
	.catch(err => {
		console.log(err)
	})
