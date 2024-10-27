const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const fs = require('fs')
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