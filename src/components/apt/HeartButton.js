import { HeartFilled, HeartTwoTone } from '@ant-design/icons'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import http from 'src/api/http'
import { isLogInState, modalLoginVisibleState } from 'src/store/states'

const HeartButton = ({ aptCode }) => {
  const [filled, setFilled] = useState(false)
  const isLogIn = useRecoilValue(isLogInState)
  // eslint-disable-next-line no-unused-vars
  const [_, setIsModalLoginVisible] = useRecoilState(modalLoginVisibleState)

  const onClickHandler = async () => {
    if (!isLogIn) {
      alert(`로그인이 필요합니다.`)
      setIsModalLoginVisible(true)
      return
    }
    setFilled(!filled)
    if (!filled) {
      await http
        .post('/members/favorites', {
          aptCode: aptCode,
        })
        .then((data) => {
          alert(`관심 아파트로 등록 완료!`)
        })
        .catch((err) => {
          if (err.response.status === 409) {
            alert(`이미 등록된 아파트 입니다.`)
          } else {
            alert(`등록 실패 ..ㅠㅠ`)
          }
          console.log(err)
        })
    } else {
      await http
        .delete('/members/favorites', {
          data: {
            aptCode: aptCode,
          },
        })
        .then((data) => {
          alert(`관심 아파트로 삭제 완료!`)
        })
        .catch((err) => {
          alert(`삭제 실패 ..ㅠㅠ`)
          console.log(err)
        })
    }
  }
  return (
    <StyledWrapper>
      <button id="star-wrapper" onClick={onClickHandler}>
        {!filled ? (
          <HeartTwoTone
            twoToneColor={'#eb2f96'}
            style={{ fontSize: '30px', padding: '7px' }}
          />
        ) : (
          <HeartFilled
            style={{ fontSize: '30px', padding: '7px', color: '#eb2f96' }}
          />
        )}
      </button>
    </StyledWrapper>
  )
}

export default HeartButton
const StyledWrapper = styled.div`
  #star-wrapper {
    position: absolute;
    background-color: transparent;
    border: none;
    top: 46px;
    right: 10px;
    z-index: 3;
  }
`
