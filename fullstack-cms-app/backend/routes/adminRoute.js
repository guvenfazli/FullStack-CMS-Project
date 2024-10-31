const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const authCheck = require('../middleware/authCheck')
const adminCheck = require('../middleware/adminCheck')
const { body } = require('express-validator')

/* Employees */
router.post('/createEmployee', authCheck, adminCheck, adminController.createEmployee)
router.delete('/deleteEmployee/:employeeId', authCheck, adminCheck, adminController.deleteEmployee)

/* Projects */
router.post('/createProject', [
  body('projectTitle').notEmpty().isLength({ min: 1 }),
  body('deadline').notEmpty().isDate()
], authCheck, adminCheck, adminController.createProject)

router.put('/editProject/:chosenProjectId', authCheck, adminCheck, adminController.editProject)

router.delete('/deleteProject/:chosenProjectId', authCheck, adminCheck, adminController.deleteProject)

/* Project Tasks */
router.post('/createTask/:chosenProjectId', [
  body('taskTitle').notEmpty().isLength({ min: 1 }),
  body('deadline').notEmpty().isDate()
], authCheck, adminCheck, adminController.createTaskToProject)

router.put('/editTask/:chosenTaskId', [
  body('taskTitle').notEmpty().isLength({ min: 1 }),
  body('deadline').notEmpty().isDate()
], authCheck, adminCheck, adminController.editProjectTask)

module.exports = router