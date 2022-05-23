import LeftSide from 'src/components/layout/LeftSide'
// import KakaoMap from 'src/components/map/KakaoMap'
import MULTICAMPUS_COORD from 'src/constants/coord'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useEffect, useState } from 'react'
import { levelRange, priceToString } from 'src/utils'
import axios from 'axios'

const MainScreen = () => {
  const { lat, lng } = MULTICAMPUS_COORD
  const [map, setMap] = useState(null)
  const [, setMarkers] = useState([])
  const [content, setContent] = useState([])
  const [markerPositions, setMarkerPositions] = useState([])

  useEffect(() => {
    const result = content.map((e) => {
      return { lat: e.lat, lng: e.lng, apt }
    })
    setMarkerPositions(result)
    console.log(result)
  }, [content])

  useEffect(() => {
    if (map === null) {
      return
    }

    // save center position
    const center = map.getCenter()

    // change viewport size

    // relayout and...
    map.relayout()
    // restore
    map.setCenter(center)
  }, [map])

  return (
    <>
      <Map
        center={{ lat, lng }}
        style={{ width: '100%', height: '98vh' }}
        onCreate={(map) => setMap(map)}
        onIdle={() => {
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

          result
            .then((data) => {
              console.log(data)
              setMarkerPositions(data.data.content)
            })
            .catch((e) => {
              console.log('error occured! : ' + e)
            })
        }}
      >
        {markerPositions.map((e, index) => (
          <MapMarker
            key={`markers-${index}`}
            position={{ lat: e.lat, lng: e.lng }} // 마커를 표시할 위치
            image={{
              src: 'https://svgshare.com/i/hbw.svg',
              size: {
                width: 24,
                height: 35,
              },
            }}
            options={{ className: 'marker-img' }}
            title={e.name}
          />
        ))}
      </Map>
      <LeftSide />
    </>
  )
}

export default MainScreen
