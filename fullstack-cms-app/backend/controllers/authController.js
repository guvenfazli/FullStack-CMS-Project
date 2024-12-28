const { Sequelize, Op } = require('sequelize')
const Employee = require('../models/Employee')
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const path = require('path')
const fs = require('fs')
const { throwError } = require('../middleware/throwError') // (errorMessage, statusCode)

const clearImage = (imageUrl) => {
  const filePath = path.join(__dirname, '..', imageUrl)
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        const error = new Error('Something happened')
        error.statusCode = 420
        throw error
      }
    })
  } catch (err) {
    next(err)
  }
}


exports.createAccount = async (req, res, next) => {
  const { name, surname, email, password, jobTitle, birthDate, phoneNumber } = req.body;
  const errors = validationResult(req)
  console.log(req.body)
  try {

    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 410)
    } else if (req.files.length === 0) {
      throwError('Profile picture is required', 404)
    }

    const profilePic = req.files[0].path
    const foundUser = await Employee.findOne({ where: { email: email } })

    if (foundUser) {
      throwError('Email Already Exists!', 415)
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

    const matchedUser = await bcrypt.compare(password, foundUser.password)

    if (!matchedUser) {
      const error = new Error('Username or Password is Incorrect!')
      error.statusCode = 400
      throw error
    }

    const token = jwt.sign({ name: foundUser.name, email: foundUser.email, userId: foundUser.id, userPp: foundUser.profilePic, isAdmin: foundUser.isAdmin }, process.env.WT_SCRT, { expiresIn: '24h' })

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 Hours
      secure: true,
    })


    res.json({ message: 'You are logged in!' })

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

    const resolvedCookie = jwt.verify(cookie, process.env.WT_SCRT)

    if (!resolvedCookie) {
      const error = new Error('Please log in first!')
      error.statusCode = 401
      throw error
    }

    return res.json({ user: resolvedCookie })

  } catch (err) {
    next(err)
  }

}

exports.clientRouteProtection = async (req, res, next) => {
  try {
    const cookie = req.cookies['jwt']

    const resolvedCookie = jwt.verify(cookie, process.env.WT_SCRT)

    if (!resolvedCookie) {
      const error = new Error('Please log in first!')
      error.statusCode = 401
      throw error
    }

    return res.send()

  } catch (err) {
    next(err)
  }

}