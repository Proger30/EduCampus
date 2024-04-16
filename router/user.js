const express = require('express');

const userHandler = require('../handlers/user');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, userHandler.getProfile);

// router.post('/logout', authController.postLogout);

module.exports = router;