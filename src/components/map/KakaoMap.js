/* eslint-disable */
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { MULTICAMPUS_COORD, MAP_LEVEL_THRESHOLD } from 'src/constants/map'
import { levelRange, priceToString, downLevel } from 'src/utils'
import mapSmt from 'src/utils/mapSmt'

const KakaoMap = () => {
  const [kakaoMap, setKakaoMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [content, setContent] = useState([])
  const [markerPositions, setMarkerPositions] = useState([])
  const container = useRef(null)

  useEffect(() => {
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
        container.current.style.height = `98vh`

        kakao.maps.event.addListener(map, 'idle', async () => {
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

          const result = await axios.get(`http://15.152.141.201:80/${url}`)

          console.log(result)
          setContent(result.data.content)
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
    // relayout and...
    kakaoMap.relayout()
    // restore
    kakaoMap.setCenter(center)
  }, [kakaoMap])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }
    let level = kakaoMap.getLevel()
    const markerInforms = content.map((e) => {
      // eslint-disable-next-line no-use-before-define
      let $wrap = document.createElement('div')
      $wrap.style.cssText = `
      width:90px; height:50px; background-color:#2BC0E4; text-align:center;
    `

      const zoomMap = async () => {
        let result = await mapSmt(kakaoMap)
        let newCenter = new kakao.maps.LatLng(e.lat, e.lng)
        let newLevel = downLevel(level)
        newLevel && kakaoMap.setLevel(newLevel)
        kakaoMap.setCenter(newCenter)

        setContent(result.data.content)
      }
      $wrap.addEventListener('click', zoomMap)

      let $name = document.createElement('div')
      $name.style.cssText = `color:#EAECC6`
      $name.innerText = e.name

      let $price = document.createElement('div')
      $price.innerText = priceToString(Math.floor(e.avgPrice))

      $wrap.appendChild($name)
      $wrap.appendChild($price)

      return {
        position: new kakao.maps.LatLng(e.lat, e.lng),
        inform: $wrap,
      }
    })

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null))

      return markerInforms.map((e) => {
        // console.log(e)
        let a = new kakao.maps.CustomOverlay({
          map: kakaoMap,
          position: e.position,
          content: e.inform,
        })
        return a
      })
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
    </>
  )
}

export default KakaoMap
