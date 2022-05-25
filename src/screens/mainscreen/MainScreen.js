import AuthModal from 'src/components/modal/AuthModal'
import LeftSide from 'src/components/layout/LeftSide'
import RightSide from 'src/components/layout/RightSide'
import KakaoMap from 'src/components/map/KakaoMap'
import FilterSlider from 'src/components/modal/FilterSlider'

const MainScreen = () => {
  return (
    <>
      <KakaoMap />
      <LeftSide />
      <RightSide />
      <AuthModal />
      <FilterSlider />
    </>
  )
}

export default MainScreen
