const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const token = req.header('Authorization');
	if (!token) return res.status(401).json({ error: 'Access denied' });
	try {
	const decoded = jwt.verify(token, process.env.SECRET_KEY);
	req.id = decoded.id;
	next();
	} catch (error) {
	res.status(401).json({ error: 'Invalid token' });
	}
 };

module.exports = verifyToken;