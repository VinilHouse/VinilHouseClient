import React, { useEffect, useRef, useState } from 'react'

function KaKaoMap(props) {
  const { markerPositions } = props
  const [kakaoMap, setKakaoMap] = useState(null)
  const [, setMarkers] = useState([])
  const container = useRef()

  useEffect(() => {
    console.log(container)
    const center = new window.kakao.maps.LatLng(37.50802, 127.062835)
    const options = {
      center,
      level: 3,
    }
    const map = new window.kakao.maps.Map(container.current, options)

    setKakaoMap(map)
  }, [container])

  useEffect(() => {
    if (kakaoMap === null) {
      return
    }

    // save center position
    const center = kakaoMap.getCenter()

    // change viewport size
    const [width, height] = [400, 400]
    container.current.style.width = `${width}px`
    container.current.style.height = `${height}px`

    // relayout and...
    kakaoMap.relayout()
    // restore
    kakaoMap.setCenter(center)
  }, [kakaoMap])

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

export default KaKaoMap
