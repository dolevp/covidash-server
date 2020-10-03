const numberUtils = require('./numbers')

const now = new Date()

module.exports = {
  log: (message) => {
    const hour = numberUtils.zeroPadInteger(now.getUTCHours())
    const minutes = numberUtils.zeroPadInteger(now.getUTCMinutes())
    console.log(`[${hour}:${minutes}] ${message}`)
  },
}
