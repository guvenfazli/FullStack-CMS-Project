const Employee = require('../models/Employee')

exports.fetchUserData = (req, res, next) => {

  Employee.count().then(countedEmployees => {

    return res.json({ totalUsers: countedEmployees })

  })


}