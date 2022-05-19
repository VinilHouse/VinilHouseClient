import KakaoMap from 'src/components/map/KakaoMap'
import { useState } from 'react'

const MainScreen = () => {
  const [markerPositions, setMarkerPositions] = useState([])
  return (
    <>
      <KakaoMap markerPositions={markerPositions} />
    </>
  )
}

export default MainScreen
