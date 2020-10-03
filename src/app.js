const express = require('express')
const axios = require('axios')
const csvtojson = require('csvtojson')
const constants = require('./constants')

const app = express()
const port = 8080
const csvFilePath = './data/covid_statistics.csv'

let covidCasesData
const zeroPadInteger = (element, targetLength = 2) => {
  let paddedElement = element
  while (paddedElement.length < targetLength) {
    paddedElement = `0${paddedElement}`
  }

  return paddedElement
}
const getFormattedTodayStr = () => {
  const today = new Date()
  const month = zeroPadInteger(today.getUTCMonth() + 1) // +1 because it's starting from 0
  const day = zeroPadInteger(today.getUTCDate())
  const year = today.getUTCFullYear()
  return `${month}-${day}-${year}`
}
const retrieveCovidData = async () => {
  const file = await axios({
    url: `${constants.covidStatisticsGithubRepositoryURL}/${getFormattedTodayStr()}.csv`,
    method: 'GET',
    responseType: 'stream',
  })
  return csvtojson({ ignoreEmpty: true })
    .fromStream(file)
}


app.get('/', async (req, res) => {
  try {
    covidCasesData = covidCasesData || await retrieveCovidData()
    return res.json(covidCasesData)
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
