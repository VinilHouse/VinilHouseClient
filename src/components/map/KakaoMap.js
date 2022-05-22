/* eslint-disable */
import { useEffect, useState, useRef } from 'react'
import MULTICAMPUS_COORD from 'src/constants/coord'
import axios from 'axios'

const KakaoMap = () => {
  const [kakaoMap, setKakaoMap] = useState(null)
  const [, setMarkers] = useState([])
  const [content, setContent] = useState([])
  const [markerPositions, setMarkerPositions] = useState([])
  const container = useRef(null)

  useEffect(() => {
    console.log
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services,clusterer&autoload=false`
    document.head.appendChild(script)

    script.onload = () => {
      kakao.maps.load(() => {
        const { lat, lng } = MULTICAMPUS_COORD
        const center = new kakao.maps.LatLng(lat, lng)
        const options = {
          center,
          level: 6,
        }
        const map = new kakao.maps.Map(container.current, options)

        container.current.style.width = `100%`
        container.current.style.height = `100vh`

        kakao.maps.event.addListener(map, 'idle', function () {
          // 지도 영역정보를 얻어옵니다
          let bounds = map.getBounds()

          // 영역정보의 남서쪽 정보를 얻어옵니다
          let swLatlng = bounds.getSouthWest()

          // 영역정보의 북동쪽 정보를 얻어옵니다
          let neLatlng = bounds.getNorthEast()

          let message =
            '<p>영역좌표는 남서쪽 위도, 경도는  ' +
            swLatlng.toString() +
            '이고 <br>'
          message +=
            '북동쪽 위도, 경도는  ' + neLatlng.toString() + '입니다 </p>'

          let resultDiv = document.getElementById('result')
          resultDiv.innerHTML = message

          const result = axios.get(
            `http://15.152.141.201:9876/api/location/range?beginLat=${swLatlng.Ma}&beginLng=${swLatlng.La}&endLat=${neLatlng.Ma}&endLng=${neLatlng.La}&level=DONG`,
          )

          result
            .then((data) => {
              console.log(data)
              setContent(data.data.content)
            })
            .catch((e) => {
              console.log('error occured! : ' + e)
            })
        })

        setKakaoMap(map)
      })
    }
  }, [])

  useEffect(() => {
    const result = content.map((e) => {
      return [e.lat, e.lng]
    })
    setMarkerPositions(result)
  }, [content])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }

    // save center position
    const center = kakaoMap.getCenter()

    // change viewport size

    // relayout and...
    kakaoMap.relayout()
    // restore
    kakaoMap.setCenter(center)
  }, [kakaoMap])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }

    const markerInforms = content.map((e) => ({
      position: new kakao.maps.LatLng(e.lat, e.lng),
      inform: `<div style="padding:5px;">${e.name}<br><div style="color:blue">평균 가격: ${e.avgPrice}</div>`,
    }))

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null))

      return markerInforms.map(
        (e) =>
          new kakao.maps.InfoWindow({
            map: kakaoMap,
            position: e.position,
            content: e.inform,
          }),
      )
    })

    // if (positions.length > 0) {
    //   const bounds = positions.reduce(
    //     (bounds, latlng) => bounds.extend(latlng),
    //     new kakao.maps.LatLngBounds(),
    //   )

    //   kakaoMap.setBounds(bounds)
    // }
  }, [kakaoMap, content])

  return (
    <>
      <div id="container" ref={container} />
      <div id="result" />
    </>
  )
}

export default KakaoMap
