const route = require('express').Router()
const ReviewController = require('../controllers/reviewController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const upload = require('../middlewares/upload')

route.use(authentication)
route.get('/', ReviewController.getAll)
route.post('/', upload.fields([{ name: 'photo' }]), ReviewController.create)
route.delete('/:id', authorization, ReviewController.deleteReview)
route.put('/:id', authorization, ReviewController.editReview)

module.exports = route