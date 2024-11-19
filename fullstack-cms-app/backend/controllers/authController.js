const { Sequelize, Op } = require('sequelize')
const Employee = require('../models/Employee')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.createAccount = async (req, res, next) => {
  const { name, surname, email, password, jobTitle, birthDate, phoneNumber } = req.body;
  const profilePic = req.files[0].path
  const errors = validationResult(req)
  console.log(req.body)

  try {

    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg)
      error.statusCode = 410
      throw error
    }

    const foundUser = await Employee.findOne({ where: { email: email } })

    if (foundUser) {
      const error = new Error('Email Already Exists!')
      error.statusCode = 415
      throw error
    }

    const hashedPw = await bcrypt.hash(password, 12)

    await Employee.create({
      name: name,
      surname: surname,
      email: email,
      password: hashedPw,
      jobTitle: jobTitle,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
      profilePic: profilePic
    })

    return res.json({ message: 'Account Successfully Created!' })

  } catch (err) {
    next(err)
  }
}

exports.loginAccount = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req)
  let user;

  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg)
      error.statusCode = 410
      throw error
    }

    const foundUser = await Employee.findOne({ where: { email: email } })

    if (!foundUser) {
      const error = new Error('User Could not Found!')
      error.statusCode = 404
      throw error
    }

    user = foundUser

    const matchedUser = await bcrypt.compare(password, foundUser.password)

    if (!matchedUser) {
      const error = new Error('Username or Password is Incorrect!')
      error.statusCode = 400
      throw error
    }

    const token = jwt.sign({ name: user.name, email: user.email, userId: user.id, userPp: user.profilePic, isAdmin: user.isAdmin }, 'secretswithcms', { expiresIn: '1h' })

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    })
    res.json({ token: token, message: 'You are logged in!' })

  } catch (err) {
    next(err)
  }

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
      error.statusCode = 401
      throw error
    }

    return res.json({ user: cookie })

  } catch (err) {
    next(err)
  }

}