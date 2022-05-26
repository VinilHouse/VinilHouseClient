import { levelRange } from 'src/utils'
import http from 'src/api/http'

export default function (map) {
  // 지도 영역정보를 얻어옵니다
  let bounds = map.getBounds()

  let level = map.getLevel()
  // 영역정보의 남서쪽 정보를 얻어옵니다
  let swLatlng = bounds.getSouthWest()

  // 영역정보의 북동쪽 정보를 얻어옵니다
  let neLatlng = bounds.getNorthEast()

  let levelCategory = levelRange(level)

  let url =
    levelCategory == 'DETAIL'
      ? `/houses/info/range?beginLat=${swLatlng.Ma}&beginLng=${swLatlng.La}&endLat=${neLatlng.Ma}&endLng=${neLatlng.La}`
      : `/location/range?beginLat=${swLatlng.Ma}&beginLng=${swLatlng.La}&endLat=${neLatlng.Ma}&endLng=${neLatlng.La}&level=${levelCategory}`

  const result = http.get(`${url}`)

  return result
}
