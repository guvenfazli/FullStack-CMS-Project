const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')


router.post('/createAccount', authController.createAccount)

module.exports = router