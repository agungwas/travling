const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

module.exports = class UserController {
  static async register (req, res, next) {
    try {
      await User.create(req.body)
      res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
      next(error)
    }
  }
  static async login (req, res, next) {
    try {
      const { email, password } = req.body
      const data = await User.findOne({ where: { email }})
      console.log(data);
      if (!data) throw { error: 'Email/Password Error', status: 400 }
      if (!compare(password, data.password)) throw { error: 'Email/Password Error', status: 400 }
      const { id, email: email1, url_photo_profile } = data
      const access_token = signToken({ email: email1, id, url_photo_profile })
      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }
}