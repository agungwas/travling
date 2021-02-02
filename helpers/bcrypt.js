const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(Number(process.env.SALT))
module.exports = {
  hash: (password) => bcrypt.hashSync(password, salt),
  compare: (password, hashed) => bcrypt.compareSync(password, hashed)
}