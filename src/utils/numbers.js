module.exports = {
  zeroPadInteger: (element, targetLength = 2) => {
    let paddedElement = element.toString()
    while (paddedElement.length < targetLength) {
      paddedElement = `0${paddedElement}`
    }

    return paddedElement
  },
}
