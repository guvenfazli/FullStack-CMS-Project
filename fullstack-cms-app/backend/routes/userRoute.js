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

router.put('/employees/:chosenEmployeeId', body('name')
  .notEmpty()
  .withMessage('Name is required')
  .isLength({ min: 2 })
  .withMessage('Name must be at least 2 characters long'),
  body('surname')
    .notEmpty()
    .withMessage('Surname is required')
    .isLength({ min: 1 })
    .withMessage('Surname must be at least 2 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ min: 1 })
    .withMessage('Email must be at least 2 characters long')
    .isEmail()
    .withMessage('Please provide a valid email!'),
  body('jobTitle')
    .notEmpty()
    .withMessage('Job Title is required')
    .isLength({ min: 2 })
    .withMessage('Job Title must be at least 5 characters long'),
  body('birthDate')
    .isDate()
    .notEmpty()
    .withMessage('Birthdate is required'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone Number is required'), authCheck, employeeController.editEmployeeAccount)

router.get('/notifications', authCheck, employeeController.fetchNotifications)
router.patch('/markasread', authCheck, employeeController.markNotificationsAsRead)


/* Projects */
router.get('/projects/:projectId', authCheck, employeeController.fetchSingleProject)
router.get('/projects', authCheck, employeeController.fetchProjects)
router.get('/projectStats', authCheck, employeeController.fetchProjectStats)

/* Tasks */
router.get('/tasks/:projectId', authCheck, employeeController.fetchTasks)
router.patch('/tasks/:taskId', authCheck, employeeController.changeTaskStatus)

module.exports = router