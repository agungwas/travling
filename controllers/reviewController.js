const { Review } = require('../models')
const { uploadFile, deleteFile } = require('../helpers/aws')

module.exports = class ReviewController {
  static async create (req, res, next) {
    try {
      const { name, review, rating, product_name } = req.body
      const { id: UserId } = req.userLoginned
      const inserted = await Review.create({ name, review, rating: +rating, product_name, UserId })
      let link = await uploadFile(req.files, req.files.filename)
      if (!link) {
        await Review.destroy({ where: { id: inserted.id }})
        throw { status: 408, error: 'Your connection was interupted for uploading image, please try again'}
      }
      link = JSON.stringify(link)
      inserted.photos = link
      await inserted.save()
      res.status(200).json({ message: 'Successfully added review' })
    } catch (error) {
      next(error)
    }
  }
  static async deleteReview (req, res, next) {
    try {
      const { photos, id } = req.data
      await deleteFile(photos)
      const deleted = await Review.destroy({ where: { id: +id }})
      res.status(200).json({ message: 'Successfully deleted review' })
    } catch (error) {
      next(error)
    }
  }
}