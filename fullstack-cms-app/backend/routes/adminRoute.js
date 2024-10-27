const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const authCheck = require('../middleware/authCheck')
const { body } = require('express-validator')

router.delete('/deleteEmployee/:employeeId', authCheck, adminController.deleteEmployee)



module.exports = router