const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const authCheck = require('../middleware/authCheck')
const adminCheck = require('../middleware/adminCheck')
const { body } = require('express-validator')

/* Employees */
router.post('/createEmployee',
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    body('surname')
      .notEmpty()
      .withMessage('Surname is required')
      .isLength({ min: 2 })
      .withMessage('Surname must be at least 2 characters long'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isLength({ min: 2 })
      .withMessage('Email must be at least 2 characters long')
      .isEmail()
      .withMessage('Please provide a valid email!'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
    body('jobTitle')
      .notEmpty()
      .withMessage('Job Title is required')
      .isLength({ min: 2 })
      .withMessage('Job Title must be at least 5 characters long'),
    body('birthDate')
      .notEmpty()
      .withMessage('Birthdate is required'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone Number is required'),
  ]
  , authCheck, adminCheck, adminController.createEmployee)
router.delete('/deleteEmployee/:employeeId', authCheck, adminCheck, adminController.deleteEmployee)

/* Projects */
router.post('/createProject', [
  body('projectTitle').notEmpty().withMessage('Project Title Required!').isLength({ min: 1 }).withMessage('Title must be minimum 1 character!'),
  body('deadline').notEmpty().withMessage('Deadline Required!').isDate().withMessage('Should be a date!')
], authCheck, adminCheck, adminController.createProject)

router.put('/editProject/:chosenProjectId', [
  body('projectTitle').notEmpty().isLength({ min: 1 }),
  body('deadline').notEmpty().isDate()
], authCheck, adminCheck, adminController.editProject)

router.delete('/deleteProject/:chosenProjectId', authCheck, adminCheck, adminController.deleteProject)

/* Project Tasks */
router.post('/createTask/:chosenProjectId', [
  body('taskTitle').notEmpty().withMessage('Title required!').isLength({ min: 1 }),
  body('deadline').notEmpty().withMessage('Deadline required!').isDate()
], authCheck, adminCheck, adminController.createTaskProject)

router.put('/editTask/:chosenTaskId', [
  body('taskTitle').notEmpty().withMessage('Task Title Required!').isLength({ min: 1 }).withMessage('Title must be minimum 1 character!'),
  body('deadline').notEmpty().withMessage('Deadline Required!').isDate().withMessage('Should be a date!')
], authCheck, adminCheck, adminController.editProjectTask)

router.put('/assignEmployees/:chosenTaskId/:assignedProjectId', [
  body().notEmpty().isArray({ min: 1 }).withMessage('Please choose at least one employee!').isArray({ min: 1, max: 10 }).withMessage('You can not assign more than 10 employees at once!')
], authCheck, adminCheck, adminController.assignEmployees)

router.put('/resignEmployees/:chosenTaskId/:chosenEmployeeId/:chosenProjectId', authCheck, adminCheck, adminController.resignEmployees)

router.delete('/deleteTask/:chosenTaskId/:chosenProjectId', authCheck, adminCheck, adminController.deleteProjectTask)

module.exports = router