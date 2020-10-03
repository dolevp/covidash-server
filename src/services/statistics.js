const _ = require('lodash')
const constants = require('../constants')
const logging = require('../utils/logging')
const fileUtils = require('../utils/files')
const numberUtils = require('../utils/numbers')

const { getJSONFromCSVURL } = fileUtils

const mergeStatisticsByCountry = (countryStatsList) => {
  /**
   * Aggregates all the relevant data from the given JSON array and sums the case numbers, kind
   * of like a group-by & sum SQL statement.
   *
   * e.g [{ "Country/Region": "Australia", "State/Province": "A", "1/1/2020": 5 },
   *      { "Country/Region": "Australia", "State/Province": "B", "1/1/2020": 8 }]
   *
   * => { "Australia": { "1/1/2020": 13 } }
   */
  const countryStatResults = {}
  countryStatsList.forEach((countryObj) => {
    const countryOrRegion = countryObj['Country/Region']
    const relevantCountryStats = _.reject(Object.keys(countryObj),
      (stat) => constants.irrelevantCountryStatsData.includes(stat))

    relevantCountryStats.forEach((stat) => {
      countryStatResults[countryOrRegion] = countryStatResults[countryOrRegion] || {}
      countryStatResults[countryOrRegion][stat] = numberUtils.addUndefinableNumbers(
        countryStatResults[countryOrRegion][stat],
        countryObj[stat],
      )
    })
  })

  return countryStatResults
}

module.exports = {
  getCovidStatistics: async () => {
    logging.log('Getting COVID-19 statistics')
    const allStatistics = {}
    const dataURLByCategory = constants.covidTimeSeriesURLs.global

    // eslint-disable-next-line no-restricted-syntax
    for await (const [categoryName, categoryURL] of Object.entries(dataURLByCategory)) {
      const categoryJSON = await getJSONFromCSVURL(categoryURL)
      allStatistics[categoryName] = mergeStatisticsByCountry(categoryJSON)
    }

    return allStatistics
  },
}
