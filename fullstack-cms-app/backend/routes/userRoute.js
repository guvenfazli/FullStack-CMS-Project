const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator')

router.get('/home', userController.fetchUserData)

module.exports = router