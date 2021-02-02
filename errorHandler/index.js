const { JsonWebTokenError } = require("jsonwebtoken");

module.exports = (err, req, res, next) => {
  console.log(err, "dari error");
  console.log(JSON.stringify(err));
  
  let [ status, error ] = [ err.status || 500,  err.error || 'Internal server error' ]
  
  if (err.name === 'JsonWebTokenError') {
    error = 'Access Token is invalid/expired, Please login again'
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    error = err.errors.map(el => el.message)
  }
  if (err.name === "SequelizeValidationError") {
    error = err.errors.map(el => el.message)
  }
  res.status(status).json({ error })
}