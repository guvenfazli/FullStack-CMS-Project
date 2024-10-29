const Admin = require('../models/Admin')

module.exports = (req, res, next) => {
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