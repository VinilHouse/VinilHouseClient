const levelRange = (val) => {
  if (val < 4) return 'DETAIL'
  if (val < 7) return 'DONG'
  if (val < 10) return 'GUGUN'
  return 'SIDO'
}
export default levelRange
