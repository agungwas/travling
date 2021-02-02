const route = require('express').Router()
const userRoutes = require('./userRoutes')
const reviewRoutes = require('./reviewRoutes')

route.use('/user', userRoutes)
route.use('/review', reviewRoutes)

module.exports = route