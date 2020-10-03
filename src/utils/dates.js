const numbersHelper = require('./numbers')

module.exports = {
  formatDate: (date) => {
    // +1 because it's starting from 0
    const month = numbersHelper.zeroPadInteger(date.getUTCMonth() + 1)
    const day = numbersHelper.zeroPadInteger(date.getUTCDate())
    const year = date.getUTCFullYear()
    return {
      month,
      day,
      year,
    }
  },
}
