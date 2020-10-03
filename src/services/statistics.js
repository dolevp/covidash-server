const axios = require('axios')
const csvtojson = require('csvtojson')
const constants = require('../constants')
const dateHelper = require('../utils/dates')
const errors = require('../errors')

const { DataTooOldError } = errors

const handleDataFile404 = (startDate, daysAgo) => {
  if (daysAgo < 4) {
    // Get data from 1 day before
    console.warn('Failed to fetch data from today, trying to get older data if available')
    return module.exports.getCovidStatistics(startDate, daysAgo + 1)
  }
  throw new DataTooOldError(daysAgo)
}

module.exports = {
  getCovidStatistics: async (startDate, daysAgo = 0) => {
    startDate.setUTCDate(startDate.getUTCDate() - daysAgo)
    const { month, day, year } = dateHelper.formatDate(startDate)
    const url = `${constants.covidStatisticsGithubRepositoryURL}/${month}-${day}-${year}.csv`
    try {
      const response = await axios({
        url,
        method: 'GET',
      })
      return csvtojson({ ignoreEmpty: true })
        .fromString(response.data)
    } catch (e) {
      if (e.response?.status === 404) {
        e.status = e.response.status
        return handleDataFile404(startDate, daysAgo)
      }
      throw e
    }
  },
}
