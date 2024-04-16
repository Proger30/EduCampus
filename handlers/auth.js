const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.postSignup = (req, res, next) => {
	const { id, password, firstName, lastName, patronymic, confirmPassword } = req.body
	User.findByPk(id)
	.then(async (result) => {
		console.log(result)
		if(result) {
			return res.json({
				code: -2,
				message: "Такой пользователь имеется",
				data: null,
			})
		}
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({
			id,
			password: hashedPassword,
			firstName,
			lastName,
			patronymic: patronymic !== '' && patronymic !== null && patronymic !== undefined && patronymic,
		})
		await user.save()
		return res.json({
			code: 0,
			message: "Succesfully added;",
			data: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				patronymic: user.patronymic,
			},
		})
	})
	.catch(err => {
		console.log(err)
		return res.json({
			code: -1,
			message: err,
			data: null,
		})
	})

}

exports.postLogin = (req, res, next) => {
	const {id, password} = req.body;
	User.findByPk(id)
	  .then(user => {
		if (!user) {
		  	return res.json({
				code: -2,
				message: "Invalid id or password",
				data: null,
			});
		}
		bcrypt
		  .compare(password, user.password)
		  .then(doMatch => {
			if (doMatch) {
				const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
					expiresIn: '1h',
					});
				return res.json({
					code: 0,
					message: 'Successfuly authorized.',
					data: {token},
				});
			}
		  })
		  .catch(err => {
			console.log(err);
			res.redirect('/login');
		  });
	  })
	  .catch(err => console.log(err));
};