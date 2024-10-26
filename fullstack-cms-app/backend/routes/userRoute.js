const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authCheck = require('../middleware/authCheck')
const { body } = require('express-validator')

router.get('/home', authCheck, userController.fetchUserData)

router.get('/employees', authCheck, userController.fetchAllUser)

module.exports = router