const jwt = require('jsonwebtoken')
module.exports = {
  signToken: (data) => jwt.sign(data, process.env.JWT_KEY),
  verifyToken: (data, cb) => jwt.verify(data, process.env.JWT_KEY, (err, data) => err ? cb(err) : cb(null, data))
}