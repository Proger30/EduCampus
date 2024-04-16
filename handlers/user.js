const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getProfile = (req, res) => {
	User.findByPk(req.id)
	.then(user => {
		const { id, firstName, lastName, patronymic } = user
		return res.status(200).json({
			id,
			firstName,
			lastName,
			patronymic
		})
	})
}