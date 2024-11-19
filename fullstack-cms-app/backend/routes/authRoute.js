const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { body } = require('express-validator')


router.post('/createAccount', [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('surname')
    .notEmpty()
    .withMessage('Surname is required')
    .isLength({ min: 1 })
    .withMessage('Surname must be at least 2 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ min: 1 })
    .withMessage('Email must be at least 2 characters long')
    .isEmail()
    .withMessage('Please provide a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('jobTitle')
    .notEmpty()
    .withMessage('Job Title is required')
    .isLength({ min: 2 })
    .withMessage('Job Title must be at least 5 characters long'),
  body('birthDate')
    .isDate()
    .notEmpty()
    .withMessage('Birthdate is required'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone Number is required'),
], authController.createAccount)

router.post('/loginAccount', [
  body('email').isEmail().withMessage('Please enter a valid email!').notEmpty().withMessage('Email required!'),
  body('password').notEmpty().withMessage('Please enter a valid password').trim().isLength({ min: 5 }).withMessage('Password must be min. 5 characters long')
], authController.loginAccount)

router.post('/logOut', authController.logOut)


router.get('/cookieCheck', authController.cookieCheck)
router.get('/routeProtection', authController.clientRouteProtection)

module.exports = router