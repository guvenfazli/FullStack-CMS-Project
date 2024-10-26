const Employee = require('../models/Employee')
const Admin = require('../models/Admin')

exports.fetchUserData = (req, res, next) => {
  Employee.count().then(countedEmployees => {
    return res.json({ totalUsers: countedEmployees })
  })
}

exports.fetchAllUser = (req, res, next) => {
  Employee.findAll().then(allEmployees => {
    return res.json({ employees: allEmployees })
  })
}