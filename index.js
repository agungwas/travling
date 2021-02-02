if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./errorHandler')
const PORT = Number(process.env.PORT)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, _=> console.log('app is running on http://localhost:'+PORT));