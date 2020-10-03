const { CronJob } = require('cron')
const logging = require('../utils/logging')
const statisticsService = require('../services/statistics')

let covidStatistics

const updateStatisticsJob = new CronJob('9 * * * *', (async () => {
  logging.log('Auto-updating COVID-19 statistics...')
  covidStatistics = await statisticsService.getCovidStatistics()
}), null, true)

updateStatisticsJob.start()

module.exports = {
  getCovidStatistics: async (req, res) => {
    try {
      covidStatistics = covidStatistics || await statisticsService.getCovidStatistics()
      return res.status(200).json({ status: 200, data: covidStatistics, message: 'Successfully retrieved covid-19 data' })
    } catch (e) {
      const status = e.response?.status || 500
      covidStatistics = undefined
      return res.status(status).json({ status, message: e.message })
    }
  },
}
