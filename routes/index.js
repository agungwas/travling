const route = require('express').Router()
const userRoutes = require('./userRoutes')
const reviewRoutes = require('./reviewRoutes')

route.get('/', (req, res) => { res.status(200).json("Hallo! perkenalkan saya Agung Setya Pratama")})
route.use('/user', userRoutes)
route.use('/review', reviewRoutes)

module.exports = route