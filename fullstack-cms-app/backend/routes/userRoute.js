const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authCheck = require('../middleware/authCheck')
const { body } = require('express-validator')

router.get('/home', authCheck, userController.fetchUserData)

router.get('/employees', authCheck, userController.fetchAllUser)
router.get('/employees/filtering', authCheck, userController.filterEmployees)


module.exports = router