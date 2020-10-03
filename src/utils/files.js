const axios = require('axios')
const csvtojson = require('csvtojson')

module.exports = {
  getJSONFromCSVURL: async (csvURL) => {
    const response = await axios({
      url: csvURL,
      method: 'GET',
    })
    return csvtojson({ ignoreEmpty: true })
      .fromString(response.data)
  },
}
