const priceToString = (val) => {
  let unitWords = ['만', '억']
  let splitUnit = 1000
  let splitCount = unitWords.length
  let resultArray = []
  let resultString = ''

  for (let i = 0; i < splitCount; i++) {
    let unitResult = (val % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i)
    unitResult = Math.floor(unitResult)

    if (unitResult > 0) {
      resultArray[i] = unitResult / 10
    }
  }
  resultString = String(resultArray[1]) + unitWords[1]

  return resultString
}

console.log(priceToString(55455))
