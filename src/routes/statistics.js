const express = require('express')

const router = express.Router()
const statisticsController = require('../controllers/statistics')

router.get('/statistics', statisticsController.getCovidStatistics)

module.exports = router
