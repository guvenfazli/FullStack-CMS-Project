const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies['jwt']
    const resolvedCookie = jwt.verify(cookie, process.env.WT_SCRT)

    if (!resolvedCookie) {
      const error = new Error('Please log in first!')
      error.statusCode = 401 //Unauthorized Error code.
      throw error
    }

    req.user = resolvedCookie

    next()

  } catch (err) {
    next(err)
  }
}