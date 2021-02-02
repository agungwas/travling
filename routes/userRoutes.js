const route = require('express').Router()
const UserController = require('../controllers/userController')
const upload = require('../middlewares/upload')
const authentication = require('../middlewares/authentication')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.use(authentication)
route.post('/picture', upload.fields([{ name: 'photo' }]), UserController.picture)
route.delete('/picture', UserController.delPicture)

module.exports = route