import { HeartFilled, HeartTwoTone } from '@ant-design/icons'
import styled from '@emotion/styled'
import { useState } from 'react'
import http from 'src/api/http'

const HeartButton = ({ aptCode }) => {
  const [filled, setFilled] = useState(false)

  const onClickHandler = async () => {
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
          alert(`로그인이 필요합니다.`)
          console.log(err)
        })
    } else {
      await http
        .delete('/members/favorites', {
          aptCode: aptCode,
        })
        .then((data) => {
          alert(`관심 아파트로 삭제 완료!`)
        })
        .catch((err) => {
          alert(`로그인이 필요합니다.`)
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
    right: 0;
    z-index: 3;
  }
`
