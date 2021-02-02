const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    verifyToken(req.headers.access_token, async (err, data) => {
      try {
        const { email, id, url_photo_profile } = data
        const found = await User.findOne({ where: { email }})
        if (!found) throw { error: 'User not found' }
        req.userLoginned = { email, id, url_photo_profile }
        next()
      } catch (error) {
        error.status = 400
        next(error)
      }
    })
}