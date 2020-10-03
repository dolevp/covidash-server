const express = require('express')
const statisticsRouter = require('./routes/statistics')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/statistics', statisticsRouter)

module.exports = app
