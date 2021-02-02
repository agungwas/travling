const { JsonWebTokenError } = require("jsonwebtoken");

module.exports = (err, req, res, next) => {
  console.log(err, "dari error");
  
  let [ status, errors ] = [ err.status || 500,  err.error || 'Internal server error' ]
  
  if (err.name === 'JsonWebTokenError') {
    errors = 'Access Token is invalid/expired, Try to login again'
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    errors = err.errors.map(el => el.message)
  }
  if (err.name === "SequelizeValidationError") {
    errors = err.errors.map(el => el.message)
  }
  res.status(status).json({ errors })
}