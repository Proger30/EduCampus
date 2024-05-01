const express = require('express');

const userHandler = require('../handlers/module');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/studentModule', authMiddleware, userHandler.getStudentModules);
router.get('/studentModuleTasks/:moduleId', authMiddleware, userHandler.getStudentAllTasksByModule);
router.get('/studentGradeByModule/:moduleId', authMiddleware, userHandler.getStudentGradesByModule);

router.get('/groupSchedule', authMiddleware, userHandler.getGroupSchedule);

// router.post('/logout', authController.postLogout);

module.exports = router;