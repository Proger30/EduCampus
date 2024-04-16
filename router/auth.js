const express = require('express');

const authHandler = require('../handlers/auth');

const router = express.Router();

router.post('/login', authHandler.postLogin);

router.post('/signup', authHandler.postSignup);

// router.post('/logout', authController.postLogout);

module.exports = router;