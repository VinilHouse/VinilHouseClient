const areaToString = (val) => {
  let unitWord = '평'
  let splitUnit = 3.3
  let resultString = ''

  resultString = Math.round(val / splitUnit) + unitWord

  return resultString
}

export default areaToString
