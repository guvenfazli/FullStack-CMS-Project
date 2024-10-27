const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { body } = require('express-validator')


router.post('/createAccount', authController.createAccount)

router.post('/loginAccount', [
  body('password').trim().isLength({ min: 5 })
], authController.loginAccount)

router.post('/logOut', authController.logOut)

router.get('/cookieCheck', authController.cookieCheck)


module.exports = router