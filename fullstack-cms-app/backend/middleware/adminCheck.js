const Admin = require('../models/Admin')

module.exports = (req, res, next) => { // If the request passes the authcheck and if it is an admin action, checking the DB if the user really an admin.
  try {
    if (req.user.isAdmin) {
      Admin.findOne({ where: { employeeId: req.user.userId } }).then(foundAdmin => {
        if (!foundAdmin) {
          const error = new Error('You have no access!')
          error.statusCode = 408
          throw error
        }
        next()
      })
    }
  } catch (err) {
    next(err)
  }
}