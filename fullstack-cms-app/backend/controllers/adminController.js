const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const path = require('path')

const clearImage = (imageUrl) => {
  const filePath = path.join(__dirname, '..', imageUrl)

  try {
    fs.unlink(filePath, (err) => {
      const error = new Error('Something happened')
      error.statusCode = 420
      throw error
    })

  } catch (err) {
    next(err)
  }

}

exports.createEmployee = (req, res, next) => {
  const { name, surname, email, password, jobTitle } = req.body;
  const profilePic = req.files[0].path

  try {

    if (req.user.isAdmin) {

      Admin.findOne({ where: { employeeId: req.user.userId } }).then(foundAdmin => {

        if (!foundAdmin) {
          const error = new Error('You have no access!')
          error.statusCode = 408
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
      })
    }

  } catch (err) {

    next(err)

  }

}



exports.deleteEmployee = (req, res, next) => {
  const chosenEmployeeId = req.params.employeeId

  try {

    if (req.user.isAdmin) {

      Admin.findOne({ where: { employeeId: req.user.userId } }).then(foundAdmin => {

        if (!foundAdmin) {
          const error = new Error('You have no access!')
          error.statusCode = 408
          throw error
        }

        Employee.findByPk(chosenEmployeeId).then(foundUser => {

          if (!foundUser) {
            const error = new Error('User could not be found!')
            error.statusCode = 420
            throw error
          }

          clearImage(foundUser.profilePic)
          foundUser.destroy()
          return res.json({ message: 'Employee deleted successfully.' })
        })
      })
    }

  } catch (err) {

    next(err)

  }



}