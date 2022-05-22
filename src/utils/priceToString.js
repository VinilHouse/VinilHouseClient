const priceToString = (val) => {
  let unitWords = ['만', '억']
  let splitUnit = 10000
  let splitCount = unitWords.length
  let resultArray = []
  let resultString = ''

  for (let i = 0; i < splitCount; i++) {
    let unitResult = (val % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i)
    unitResult = Math.floor(unitResult)
    if (unitResult > 0) {
      resultArray[i] = unitResult
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue
    resultString = String(resultArray[i]) + unitWords[i] + resultString
  }

  return resultString
}

export default priceToString
