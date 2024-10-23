const { Sequelize, Op } = require('sequelize')
const Employee = require('../models/Employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
exports.createAccount = (req, res, next) => {
  const { name, surname, email, password, jobTitle } = req.body;
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
        job_title: jobTitle
      }).then(createdUser => {
        return res.json({ message: 'Account Successfully Created!' })
      })
    })
  }).catch(err => next(err))
}