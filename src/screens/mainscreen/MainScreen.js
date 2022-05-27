import LeftSide from 'src/components/layout/LeftSide'
import RightSide from 'src/components/layout/RightSide'
import KakaoMap from 'src/components/map/KakaoMap'
import AuthModal from 'src/components/modal/AuthModal'

const MainScreen = () => {
  // eslint-disable-next-line no-unused-vars

  return (
    <>
      <KakaoMap />
      <LeftSide />
      <RightSide />
      <AuthModal />
    </>
  )
}

export default MainScreen
