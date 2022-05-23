import { MAP_LEVEL_THRESHOLD } from 'src/constants/map'

export const levelRange = (val) => {
  if (val < MAP_LEVEL_THRESHOLD.DETAIL) return 'DETAIL'
  if (val < MAP_LEVEL_THRESHOLD.DONG) return 'DONG'
  if (val < MAP_LEVEL_THRESHOLD.GUGUN) return 'GUGUN'
  return 'SIDO'
}

export const downLevel = (val) => {
  if (val < MAP_LEVEL_THRESHOLD.DETAIL) return false
  if (val < MAP_LEVEL_THRESHOLD.DONG) return MAP_LEVEL_THRESHOLD.DETAIL - 1
  if (val < MAP_LEVEL_THRESHOLD.GUGUN) return MAP_LEVEL_THRESHOLD.DONG - 1
  return MAP_LEVEL_THRESHOLD.GUGUN - 1
}
