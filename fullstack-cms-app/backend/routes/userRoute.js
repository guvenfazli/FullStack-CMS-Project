const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController')
const authCheck = require('../middleware/authCheck')
const { body } = require('express-validator')

/* Employees */
router.get('/home', authCheck, employeeController.fetchEmployeeData)
router.get('/employees/filtering', authCheck, employeeController.filterEmployees)
router.get('/employees/:chosenEmployeeId', authCheck, employeeController.fetchSingleEmployee)
router.get('/employees', authCheck, employeeController.fetchAllEmployees)
router.get('/admins', authCheck, employeeController.fetchAllAdmins)

router.put('/employees/:chosenEmployeeId', authCheck, employeeController.editEmployeeAccount)

router.get('/notifications', authCheck, employeeController.fetchNotifications)
router.patch('/markasread', authCheck, employeeController.markNotificationsAsRead)


/* Projects */
router.get('/projects/:projectId', authCheck, employeeController.fetchSingleProject)
router.get('/projects', authCheck, employeeController.fetchProjects)
router.get('/projectStats', authCheck, employeeController.fetchProjectStats)

/* Tasks */
router.patch('/tasks/:taskId', authCheck, employeeController.changeTaskStatus)

module.exports = router