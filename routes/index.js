const route = require('express').Router()
const userRoutes = require('./userRoutes')
const reviewRoutes = require('./reviewRoutes')

route.get('/', (req, res) => { res.status(200).json("Selamat datang!\r\nAgung Setya Pratama")})
route.use('/user', userRoutes)
route.use('/review', reviewRoutes)

module.exports = route