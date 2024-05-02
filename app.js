const express = require("express");
const path = require('path');
const bcrypt = require('bcryptjs')
var cors = require('cors')

require("dotenv").config({
	override: true,
	path: path.join(__dirname, 'dev.env')
});

const authRoutes = require('./router/auth.js');
const userRoutes = require('./router/user.js');
const moduleRoutes = require('./router/module.js');

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
	Task,
	ModuleGroup,
	ModuleGroupTeacher
} = require('./models/Module/index.js');

const app = express()
app.use(cors()) 

app.use(express.json())
app.use((req, res, next) => {
	console.log(req.body, req.url)
	next()
})
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
app.use(moduleRoutes)

// Profile
Student.hasMany(AcademicPerformance)
Module.hasMany(AcademicPerformance)
AcademicPerformance.belongsTo(Student)
AcademicPerformance.belongsTo(Module)

Group.hasMany(Student, {foreignKey: {allowNull: false}})
Student.belongsTo(Group, {foreignKey: {allowNull: false}})

Teacher.hasOne(Group, {foreignKey: {name: 'advisor', allowNull: false}})
Group.belongsTo(Teacher, {foreignKey: {name: 'advisor', allowNull: false}})

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

Group.belongsToMany(Module, {through: ModuleGroup})
Module.belongsToMany(Group, {through: ModuleGroup})

ModuleGroup.belongsToMany(Teacher, {through: ModuleGroupTeacher})
Teacher.belongsToMany(ModuleGroup, {through: ModuleGroupTeacher})


Group.belongsToMany(Task, {through: GroupTask})
Group.belongsToMany(Quize, {through: GroupQuize})


sequelize.sync({force: true})
// sequelize.sync()
	.then(async (result) => {
		
		const hashedPassword = await bcrypt.hash('password', 12)

		await sequelize.query(`
		insert into users ("id", "lastName", "firstName", "patronymic", "password", "createdAt", "updatedAt") values (29323, 'Zholdybai', 'Sultanbi', 'Zholdybaiuly', '${hashedPassword}', pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into users ("id", "lastName", "firstName", "patronymic", "password", "createdAt", "updatedAt") values (29273, 'Shakuali', 'Zhansaya', 'Dauletkyzy', '${hashedPassword}', pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into users ("id", "lastName", "firstName", "patronymic", "password", "createdAt", "updatedAt") values (29272, 'Shakuali', 'Aizere', 'Dauletkyzy', '${hashedPassword}', pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		
		insert into roles ("role", "userId") values ('Student', 29323) ON CONFLICT DO NOTHING;
		insert into roles ("role", "userId") values ('Student', 29273) ON CONFLICT DO NOTHING;
		insert into roles ("role", "userId") values ('Teacher', 29272) ON CONFLICT DO NOTHING;

		insert into teachers  (id, phone, "userId") values (29272, '+77084997639', 29272) ON CONFLICT DO NOTHING;
		insert into "groups" ("group", advisor) values ('IT1-2008', 29272) ON CONFLICT DO NOTHING;		
		insert into "groups" ("group", advisor) values ('IT1-2005', 29272) ON CONFLICT DO NOTHING;		
		insert into students  (id, faculty, specialization , "userId", "groupGroup", "course") values (29323, 'FDT', 'Infomation Systems', 29323, 'IT1-2008', 3) ON CONFLICT DO NOTHING;
		insert into students  (id, faculty, specialization , "userId", "groupGroup", "course") values (29273, 'FKT', 'Infomation Systems', 29273, 'IT1-2008', 4) ON CONFLICT DO NOTHING;
		
		insert into modules ("id", "subject", "description", "createdAt", "updatedAt") values (1, 'Правовые аспекты ИКТ', 'Этот курс предназначен для изучения ключевых правовых вопросов, связанных с использованием информационно-коммуникационных технологий (ИКТ) в современном обществе. Студенты углубляются в основные аспекты юридической защиты данных, электронной коммерции, кибербезопасности, права на интеллектуальную собственность, а также регулирование интернета и цифровых платформ.', pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into modules ("id", "subject", "description", "createdAt", "updatedAt") values (2, 'Зеленые технологии и экономика', 'Этот курс представляет собой введение в инновационные зеленые технологии и их влияние на экономику и устойчивое развитие. Студенты изучат основные аспекты зеленых технологий, оценят их эффективность с точки зрения сокращения углеродного следа и оптимизации использования ресурсов.', pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;

		insert into "moduleGroups" ("groupGroup", "moduleId") values ('IT1-2008', 1) ON CONFLICT DO NOTHING;
		insert into "moduleGroupTeachers" ("moduleGroupId", "teacherId") values (1, 29272) ON CONFLICT DO NOTHING;

		insert into "moduleGroups" ("groupGroup", "moduleId") values ('IT1-2008', 2) ON CONFLICT DO NOTHING;
		insert into "moduleGroupTeachers" ("moduleGroupId", "teacherId") values (2, 29272) ON CONFLICT DO NOTHING;
		
		
		insert into tasks ("subject", "description", "moduleId", "createdAt", "updatedAt") values ('Практика по теме  «Распоряжение авторскими правами»', 'Подготовьтесь к 15 теме', 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into tasks ("subject", "description", "moduleId", "createdAt", "updatedAt") values ('Семинар по теме  «Распоряжение авторскими правами»', 'Подготовьтесь к 15 теме', 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into tasks ("subject", "description", "moduleId", "createdAt", "updatedAt") values ('Семинар по теме  «Распоряжение авторскими правами»', 'Подготовьтесь к 15 теме', 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into tasks ("subject", "description", "moduleId", "createdAt", "updatedAt") values ('Семинар по теме  «Авторские права»', 'Подготовьтесь к 15 теме', 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into "groupTasks" ("taskId", "groupGroup") values (1, 'IT1-2008') ON CONFLICT DO NOTHING;
		insert into "groupTasks" ("taskId", "groupGroup") values (2, 'IT1-2008') ON CONFLICT DO NOTHING;
		insert into "groupTasks" ("taskId", "groupGroup") values (3, 'IT1-2005') ON CONFLICT DO NOTHING;
		insert into "groupTasks" ("taskId", "groupGroup") values (4, 'IT1-2008') ON CONFLICT DO NOTHING;
		
		insert into materials ("path", "taskId", "createdAt", "updatedAt") values ('/materials/modules/Практикум.docx', 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into materials ("path", "taskId", "createdAt", "updatedAt") values ('/materials/modules/Семинар.docx', 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;


		
		insert into "academicPerformances" ("course", "studentId", "moduleId", "createdAt", "updatedAt") values (3, 29323, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into "academicPerformances" ("course", "studentId", "moduleId", "createdAt", "updatedAt") values (4, 29323, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into "academicPerformances" ("course", "studentId", "moduleId", "createdAt", "updatedAt") values (3, 29273, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into "academicPerformances" ("course", "studentId", "moduleId", "createdAt", "updatedAt") values (4, 29273, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;


		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-4', 85, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-5', 85, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-6', 85, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-7', 85, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-10', 85, 4, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-11', 85, 4, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-12', 85, 4, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-13', 85, 4, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-02-14', 85, 4, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-4', 85, 3, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-5', 85, 3, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-6', 85, 3, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-7', 85, 3, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-8', 85, 3, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-9', 85, 3, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-10', 85, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-11', 85, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-12', 85, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-13', 85, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into grades ("date", "grade", "academicPerformanceId", "createdAt", "updatedAt") values ('2024-03-14', 85, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;

		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (3, '13:00', '907', 29323, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (5, '11:00', '403', 29323, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (3, '14:00', '802', 29323, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (2, '12:00', '707', 29323, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (1, '14:00', '605', 29323, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (1, '12:00', '907', 29323, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;

		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (1, '09:00', '407', 29273, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (3, '10:00', '612', 29273, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (3, '14:00', '217 б', 29273, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (5, '12:00', '907', 29273, 2, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;
		insert into schedules ("day", "hour", "audience", "userId", "moduleId", "createdAt", "updatedAt") values (5, '13:00', '607', 29273, 1, pg_catalog.now(), pg_catalog.now()) ON CONFLICT DO NOTHING;

		`)
		
		app.listen(3000)
	})
	.catch(err => {
		console.log(err)
	})
