const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { body } = require('express-validator')


router.post('/createAccount', [
  body('name').isEmpty(),
  body('surname').isEmpty(),
  body('email').isEmail().isEmpty(),
  body('password').trim().isLength({ min: 5 }),
  body('jobTitle').isEmpty()
], authController.createAccount)

module.exports = router