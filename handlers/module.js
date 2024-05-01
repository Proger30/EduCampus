const {User, Student, Group, Teacher, AcademicPerformance, Grade, Schedule} = require('../models/Profile/index');
const {ModuleGroup, Module, ModuleGroupTeacher, Task, Material} = require('../models/Module/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

exports.getStudentModules = (req, res, next) => {
	Student.findByPk(req.id, {
		attributes: ["course"],
		include: {
			model: Group,
			required: false,
			include: {
				model: Module,
				required: false,
				attributes: ["id", "subject", "description"],
				through: { attributes: [] }
			}
		}
	})
	.then(student => {
		return res.status(200).json({
			course: student.course,
			groupInfo: {
				group: student.group.group,
				advisor: student.group.advisor
			},
			modules: student.group.modules,
		})
	})
	.catch(err => {
		return res.status(500).json({
			err
		})
	})
}

exports.getStudentAllTasksByModule = (req, res, next) => {
	Student.findByPk(req.id, {
		attributes: [],
		include: [
			{
				model: Group,
				attributes: ["group"],
				required: false,
				include: {
					model: Task,
					required: false,
					where: {
						moduleId: req.params.moduleId
					},
					attributes: ["id", "subject", "description"],
					through: {attributes: []},
					include: {
						model: Material,
						require: false,
						attributes: ["id", "path"]
					}
					}
			},
		]})
	.then(data => {
		return res.status(200).json({
			moduleId: +req.params.moduleId,
			group: data.group.group,
			tasks: data.group.tasks
		})
	})
	.catch(err => {
		return res.status(500).json({
			err
		})
	}) 
}

exports.getStudentGradesByModule = (req, res) => {
	AcademicPerformance.findOne({where: {
		studentId: req.id,
		moduleId: req.params.moduleId,
		course: req.query.course,
	},
	attributes: ["course", "studentId", "moduleId"],
	include: [{
		model: Grade,
		required: false,
		attributes: ["date", "grade"]
	}]
})
.then(data => {
	return res.status(200).json({
		data
	})
})
.catch(err => {
	return res.status(500).json({
		err
	})
})
}

exports.getGroupSchedule = (req, res) => {
	User.findByPk(req.id, {
		attributes: [],
		include: [{
			model: Schedule,
			required: false,
			order: [
				["day","ASC"],
				["hour","ASC"],
			],
			attributes: ["day", "hour", "audience", "userId", "moduleId"],
			include: {
				attributes: ["id", "subject", "description"],
				model: Module,
				required: false,
			}
		}]
	})
	.then(schedule => {
		return res.status(200).json({
			schedule
		})
	})
	.catch(err => {
		return res.status(500).json({
			err
		})
	})
}
