const express = require('express')
const cors = require('cors')
const statisticsRouter = require('./routes/statistics')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/statistics', statisticsRouter)

module.exports = app
