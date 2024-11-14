const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authCheck = require('../middleware/authCheck')
const { body } = require('express-validator')

/* Employees */
router.get('/home', authCheck, userController.fetchUserData)
router.get('/employees/filtering', authCheck, userController.filterEmployees)
router.get('/employees/:chosenEmployeeId', authCheck, userController.fetchSingleEmployee)
router.get('/employees', authCheck, userController.fetchAllUser)
router.get('/admins', authCheck, userController.fetchAllAdmins)

router.put('/employees/:chosenEmployeeId', authCheck, userController.editEmployeeAccount)

router.get('/notifications', authCheck, userController.fetchNotifications)
router.patch('/markasread', authCheck, userController.markNotificationsAsRead)


/* Projects */
router.get('/projects/:projectId', authCheck, userController.fetchSingleProject)
router.get('/projects', authCheck, userController.fetchProjects)
router.get('/projectStats', authCheck, userController.fetchProjectStats)

/* Tasks */
router.patch('/tasks/:taskId', authCheck, userController.changeTaskStatus)

module.exports = router