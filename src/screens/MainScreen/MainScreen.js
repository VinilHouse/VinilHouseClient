import KakaoMap from 'src/components/map/KakaoMap'
import { useState } from 'react'

const MainScreen = () => {
  const [markerPositions, setMarkerPositions] = useState([])
  return (
    <>
      <h1>Main Page</h1>
      <KakaoMap markerPositions={markerPositions} />
    </>
  )
}

export default MainScreen
