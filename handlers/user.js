const {User, Role, Student, Teacher, Group} = require('../models/Profile/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getProfile = (req, res) => {
	Role.findOne({where: {userId: req.id}})
	.then(async (role) => {
		console.log(role)
		if (role.role === "Student") {
			return {user: await User.findByPk(req.id, {
				attributes: ["id", "firstName", "lastName", "patronymic", "createdAt", "updatedAt"],
				include: {
					model: Student,
					required: false,
					attributes: ["faculty", "specialization"],
					include: {
						model: Group,
						required: false,
						attributes: ["group"],
						include: {
							model: Teacher,
							required: false,
							attributes: ["email", "phone"],
							include: {
								model: User,
								required: false,
								attributes: ["id", "firstName", "lastName", "patronymic"],
							}
						}
					}
				}
			}), role}
		} else if (role.role === "Teacher") {
			return {user: await User.findByPk(req.id, {
				attributes: ["id", "firstName", "lastName", "patronymic", "createdAt", "updatedAt"],
				include: {
					model: Teacher, 
					required: false,
					attributes: ["email", "phone"],
					include: {
						model: Group,
						required: false,
						attributes: ["group"],
					}
				}
			}), role}
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