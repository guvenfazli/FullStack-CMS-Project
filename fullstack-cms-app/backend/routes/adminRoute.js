const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const authCheck = require('../middleware/authCheck')
const { body } = require('express-validator')

router.post('/createEmployee', authCheck, adminController.createEmployee)

router.delete('/deleteEmployee/:employeeId', authCheck, adminController.deleteEmployee)

router.post('/createProject', authCheck, adminController.createProject)

module.exports = router