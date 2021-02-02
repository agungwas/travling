const { Review } = require('../models')
const { uploadFile, deleteFile } = require('../helpers/aws')

module.exports = class ReviewController {
  static async create (req, res, next) {
    try {
      const { name, review, rating, product_name } = req.body
      const { id: UserId } = req.userLoginned
      const inserted = await Review.create({ name, review, rating: +rating, product_name, UserId })
      let link = await uploadFile(req.files)
      if (!link) {
        await Review.destroy({ where: { id: inserted.id }})
        throw { status: 408, error: 'Your connection was interupted for uploading image, please try again'}
      }
      link = JSON.stringify(link)
      inserted.photos = link
      await inserted.save()
      let { id, photos } = inserted
      photos = JSON.parse(photos).map(el => el.Location)
      res.status(201).json({ message: 'Successfully added review', review_added: { name, review, rating, product_name, id, image_url: photos} })
    } catch (error) {
      next(error)
    }
  }
  static async deleteReview (req, res, next) {
    try {
      const { photos, name, review, product_name, rating, id } = req.data
      await deleteFile(photos)
      await Review.destroy({ where: { id: +id }})
      res.status(200).json({ message: 'Successfully deleted review', review_deleted: { name, product_name, rating, id, review } })
    } catch (error) {
      next(error)
    }
  }
  static async editReview (req, res, next) {
    try {     
      const { name, rating, review } = req.body
      const edited = await Review.update({ name, rating, review }, { where: { id: +req.params.id }, returning: true })
      if (edited[0] === 0) throw { status: 404, message: 'Review was not found' }
      let { product_name, id, photos } = edited[1][0]
      photos = JSON.parse(photos).map(el => el.Location)
      res.status(200).json({ message: 'Successfully edit review', review_edited: { name, rating, review, product_name, id, image_url: photos } })
    } catch (error) {
      next(error)
    }
  }
  static async getAll (req, res, next) {
    try {
      let data = await Review.findAll({ where: { UserId: +req.userLoginned.id }})
      data = data.map(el => {
        el.photos = JSON.parse(el.photos).map(el => el.Location)
        return el
      })
      res.status(200).json({ reviews: data })
    } catch (error) {
      next(error)
    }
  }
}