import AuthModal from 'src/components/modal/AuthModal'
import LeftSide from 'src/components/layout/LeftSide'
import RightSide from 'src/components/layout/RightSide'
import KakaoMap from 'src/components/map/KakaoMap'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { isLogInState } from 'src/store/states'

const MainScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setIsLoggedIn] = useRecoilState(isLogInState)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    setIsLoggedIn(JSON.parse(isLoggedIn))
  }, [])
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
