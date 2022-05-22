const levelRange = (val) => {
  if (val < 5) return 'DONG'
  if (val < 9) return 'GUGUN'
  return 'SIDO'
}
export default levelRange
