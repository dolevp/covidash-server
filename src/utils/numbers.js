module.exports = {
  addUndefinableNumbers: (base, numberToAdd) => Number(base || 0) + Number(numberToAdd || 0),
  zeroPadInteger: (element, targetLength = 2) => {
    let paddedElement = element.toString()
    while (paddedElement.length < targetLength) {
      paddedElement = `0${paddedElement}`
    }

    return paddedElement
  },
}
