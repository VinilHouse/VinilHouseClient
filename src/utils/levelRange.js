const levelRange = (val) => {
  if (val < 7) return 'DONG'
  if (val < 11) return 'GUGUN'
  return 'SIDO'
}
export default levelRange
