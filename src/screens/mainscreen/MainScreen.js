import LeftSide from 'src/components/layout/LeftSide'
import RightSide from 'src/components/layout/RightSide'
import KakaoMap from 'src/components/map/KakaoMap'

const MainScreen = () => {
  return (
    <>
      <KakaoMap />
      <LeftSide />
      <RightSide />
    </>
  )
}

export default MainScreen
