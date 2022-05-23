import axios from 'axios'
import { levelRange } from 'src/utils'

export default function (map) {
  // 지도 영역정보를 얻어옵니다
  let bounds = map.getBounds()

  let level = map.getLevel()
  // console.log(level)
  // 영역정보의 남서쪽 정보를 얻어옵니다
  let swLatlng = bounds.getSouthWest()

  // 영역정보의 북동쪽 정보를 얻어옵니다
  let neLatlng = bounds.getNorthEast()

  let levelCategory = levelRange(level)

  let url =
    levelCategory == 'DETAIL'
      ? `api/houses/info/range?beginLat=${swLatlng.Ma}&beginLng=${swLatlng.La}&endLat=${neLatlng.Ma}&endLng=${neLatlng.La}`
      : `api/location/range?beginLat=${swLatlng.Ma}&beginLng=${swLatlng.La}&endLat=${neLatlng.Ma}&endLng=${neLatlng.La}&level=${levelCategory}`

  const result = axios.get(`http://15.152.141.201:80/${url}`)

  return result
}
