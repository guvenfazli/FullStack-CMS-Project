const { Sequelize, Op } = require('sequelize')
const Employee = require('../models/Employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.createAccount = (req, res, next) => {
  const { name, surname, email, password, jobTitle } = req.body;
  const profilePic = req.files[0].path
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg)
    error.statusCode = 410
    throw error
  }


  Employee.findOne({ where: { email: email } }).then(foundUser => {
    if (foundUser) {
      const error = new Error('Email Already Exists!')
      error.statusCode = 415
      throw error
    }

    bcrypt.hash(password, 12).then(hashedPw => {
      Employee.create({
        name: name,
        surname: surname,
        email: email,
        password: hashedPw,
        job_title: jobTitle,
        profilePic: profilePic
      }).then(createdUser => {
        return res.json({ message: 'Account Successfully Created!' })
      })
    })
  }).catch(err => next(err))
}

exports.loginAccount = (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req)
  let user;


  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg)
    error.statusCode = 410
    throw error
  }

  Employee.findOne({ where: { email: email } }).then(foundUser => {
    if (!foundUser) {
      const error = new Error('User Could not Found!')
      error.statusCode = 414
      throw error
    }
    user = foundUser
    return bcrypt.compare(password, foundUser.password)
  }).then(matchedUser => {

    if (!matchedUser) {
      const error = new Error('Username or Password is Incorrect!')
      error.statusCode = 405
      throw error
    }

    const token = jwt.sign({ name: user.name, email: user.email, userId: user.id, userPp: user.profilePic, isAdmin: user.isAdmin }, 'secretswithcms', { expiresIn: '1h' })

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    res.json({ token: token, message: 'You are logged in!' })

  }).catch(err => next(err))
}

exports.logOut = (req, res, next) => {
  res.cookie('jwt', '', {
    maxAge: 0
  })

  res.json({ message: 'Logged Out Successfully.' })
}

exports.cookieCheck = async (req, res, next) => {

  try {
    const cookie = req.cookies['jwt']

    const resolvedCookie = jwt.verify(cookie, 'secretswithcms')

    if (!resolvedCookie) {
      const error = new Error('Please log in first!')
      error.statusCode = 402
      throw error
    }

    return res.json({ user: cookie })

  } catch (err) {
    next(err)
  }

}