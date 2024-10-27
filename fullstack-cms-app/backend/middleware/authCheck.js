const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const cookie = req.cookies['jwt']

    const resolvedCookie = jwt.decode(cookie)

    if (!resolvedCookie) {
      const error = new Error('Please log in first!')
      error.statusCode = 402
      throw error
    }

    req.user = resolvedCookie
    
    next()

  } catch (err) {
    next(err)
  }
}