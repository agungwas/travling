const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')
const { uploadFile, deleteFile } = require('../helpers/aws')

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
  static async picture (req, res, next) {
    try {
      const link = await uploadFile(req.files)
      let hasil = await User.update({ url_photo_profile: link[0] }, { where: { id: +req.userLoginned.id }, returning: true })
      if (hasil[0] === 0) throw { status: 404, message: 'User was not found' }
      res.status(200).json({ message: "Profile picture updated successfully" })
    } catch (error) {
      next(error)
    }
  }
  static async delPicture (req, res, next) {
    try {
      const { url_photo_profile } = await User.findByPk(+req.userLoginned.id)
      await deleteFile([url_photo_profile])
      let hasil = await User.update({ url_photo_profile: "" }, { where: { id: +req.userLoginned.id }, returning: true })
      if (hasil[0] === 0) throw { status: 404, message: 'User was not found' }
      res.status(200).json({ message: "Profile picture updated successfully" })
    } catch (error) {
      next(error)
    }
  }
}