import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Modal } from 'antd'
import {
  favoritesState,
  isLogInState,
  modalLoginVisibleState,
} from 'src/store/states'
import SignIn from '../user/SignIn'
import http from 'src/api/http'
// import MyPage from '../user/MyPage'
import dynamic from 'next/dynamic'

const MyPage = dynamic(() => import('../user/MyPage'), { ssr: false })

const LoginModal = () => {
  const [isModalLoginVisible, setIsModalLoginVisible] = useRecoilState(
    modalLoginVisibleState,
  )
  const [userData, setUserData] = useState()
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLogInState)
  // eslint-disable-next-line no-unused-vars
  const [_, setFavorites] = useRecoilState(favoritesState)

  const handleCancel = () => {
    setIsModalLoginVisible(false)
  }

  const handleOk = () => {
    http
      .post('/members/login', {
        ident: userData.id,
        password: userData.pw,
      })
      .then((res) => {
        if (res.status === 200) {
          alert(`${userData.id}님 로그인 되었습니다!`)
          setIsLoggedIn(true)
          // localStorage.setItem('isLoggedIn', 'true')

          http
            .get('/houses/favorites')
            .then(({ data }) => {
              setFavorites(data.content)
            })
            .catch((err) => console.log(err))

          setIsModalLoginVisible(false)
        } else {
          alert('로그인에 실패했습니다.')
        }
        console.log(res)
      })
      .catch((err) => {
        alert('잘못된 아이디나 비밀번호입니다.')
        console.log(err)
      })
  }

  const handleLogout = () => {
    http
      .post('/members/logout')
      .then((res) => {
        if (res.status === 200) {
          alert(`로그아웃 되셨습니다`)
          // localStorage.removeItem('isLoggedIn')
        } else {
          alert('로그아웃에 실패했습니다.')
        }
        setIsLoggedIn(false)
        setIsModalLoginVisible(false)
      })
      .catch((err) => {
        alert('실패했습니다.')
        console.log(err)
      })
  }

  return (
    <Modal
      title={isLoggedIn ? 'MyPage' : 'Login'}
      visible={isModalLoginVisible}
      onOk={isLoggedIn ? handleLogout : handleOk}
      okText={isLoggedIn ? '로그아웃' : '로그인'}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      {isLoggedIn ? <MyPage /> : <SignIn setUserData={setUserData} />}
    </Modal>
  )
}

export default LoginModal
