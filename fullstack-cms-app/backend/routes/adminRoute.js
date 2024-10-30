const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const authCheck = require('../middleware/authCheck')
const adminCheck = require('../middleware/adminCheck')
const { body } = require('express-validator')

router.post('/createEmployee', authCheck, adminCheck, adminController.createEmployee)

router.delete('/deleteEmployee/:employeeId', authCheck, adminCheck, adminController.deleteEmployee)

router.post('/createProject', [
  body('projectTitle').notEmpty().isLength({ min: 1 }),
  body('deadline').notEmpty().isDate()
], authCheck, adminCheck, adminController.createProject)
router.delete('/deleteProject/:chosenProjectId', authCheck, adminCheck, adminController.deleteProject)

router.post('/createTask/:chosenProjectId', [
  body('taskTitle').notEmpty().isLength({ min: 1 }),
  body('deadline').notEmpty().isDate()
], authCheck, adminCheck, adminController.createTaskToProject)

router.put('/editTask/:chosenTaskId', [
  body('taskTitle').notEmpty().isLength({ min: 1 }),
  body('deadline').notEmpty().isDate()
], authCheck, adminCheck, adminController.editProjectTask)

module.exports = router