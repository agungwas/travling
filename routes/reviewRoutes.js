const route = require('express').Router()
const ReviewController = require('../controllers/reviewController')
const authentication = require('../middlewares/authentication')

route.use(authentication)
route.post('/', ReviewController.create)

module.exports = route