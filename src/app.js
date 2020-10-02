const express = require('express')
const csvtojson = require('csvtojson')

const app = express()
const port = 8080
const csvFilePath = './data/covid_statistics.csv'

let covidCasesData
const retrieveCovidData = async () => csvtojson({ ignoreEmpty: true }).fromFile(csvFilePath)

app.get('/', async (req, res) => {
  covidCasesData = covidCasesData || await retrieveCovidData()
  res.json(covidCasesData)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
