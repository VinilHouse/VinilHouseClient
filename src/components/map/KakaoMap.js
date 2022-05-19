import React, { useEffect, useState, useRef } from 'react'
import MULTICAMPUS_COORD from 'src/constants/coord'

const KakaoMap = (props) => {
  const { markerPositions, size } = props
  const [kakaoMap, setKakaoMap] = useState(null)
  const [, setMarkers] = useState([])

  const container = useRef()

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
        //setMapCenter(center);
        setKakaoMap(map)
      })
    }
  }, [container])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }

    // save center position
    const center = kakaoMap.getCenter()

    // change viewport size
    container.current.style.width = `100%`
    container.current.style.height = `100vh`

    // relayout and...
    kakaoMap.relayout()
    // restore
    kakaoMap.setCenter(center)
  }, [kakaoMap, size])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }

    const positions = markerPositions.map(
      (pos) => new kakao.maps.LatLng(...pos),
    )

    setMarkers((markers) => {
      // clear prev markers
      markers.forEach((marker) => marker.setMap(null))

      // assign new markers
      return positions.map(
        (position) => new kakao.maps.Marker({ map: kakaoMap, position }),
      )
    })

    if (positions.length > 0) {
      const bounds = positions.reduce(
        (bounds, latlng) => bounds.extend(latlng),
        new kakao.maps.LatLngBounds(),
      )

      kakaoMap.setBounds(bounds)
    }
  }, [kakaoMap, markerPositions])

  return <div id="container" ref={container} />
}

export default KakaoMap
