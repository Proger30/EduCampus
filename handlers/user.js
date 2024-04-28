const {User, Role, Student, Teacher} = require('../models/Profile/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getProfile = (req, res) => {
	Role.findOne({where: {userId: req.id}})
	.then(async (role) => {
		console.log(role)
		if (role.role === "Student") {
			return {user: await User.findByPk(req.id, {include: {model: Student, required: false}}), role}
		} else if (role.role === "Teacher") {
			return {user: await User.findByPk(req.id, {include: {model: Teacher, required: false}}), role}
		}
	})
	.then(({user, role}) => {
		return res.status(200).json({
			code: 0,
			message: "Successful",
			data: {
				role: role.role,
				user
			}
		})
	})
	.catch((err) => {
		return res.status(500).json({
			code: -2,
			message: "User doesn't find",
			data: err
		})
	})

	// Role.findOne({userId: req.body.id})
	// .then(role => {
	// 	if (role.role === "Student") {
	// 		User.findByPk(req.body.id)
	// 		return Student.findOne({userId: req.body.id})
	// 	}
	// 	const { id, firstName, lastName, patronymic } = user
	// 	// return res.status(200).json({
	// 	// 	id,
	// 	// 	firstName,
	// 	// 	lastName,
	// 	// 	patronymic
	// 	// })
	// })
}