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

exports.filterEmployees = (req, res, next) => {
  const filterParam = req.query.filter
  Employee.findAll({ order: [filterParam] }).then(filteredUsers => {
    return res.json({ employees: filteredUsers })
  })
}