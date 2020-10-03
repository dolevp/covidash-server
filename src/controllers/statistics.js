const statisticsService = require('../services/statistics')

let covidStatistics

module.exports = {
  getCovidStatistics: async (req, res) => {
    try {
      const today = new Date()
      covidStatistics = covidStatistics || await statisticsService.getCovidStatistics(today)
      return res.status(200).json({ status: 200, data: covidStatistics, message: 'Successfully retrieved covid-19 data' })
    } catch (e) {
      const status = e.status || 500
      return res.status(status).json({ status, message: e.message })
    }
  },
}
