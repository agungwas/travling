if (process.env.NODE_ENV === 'development') require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./errorHandler')
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, _=> console.log('app is running on https://localhost:'+PORT));