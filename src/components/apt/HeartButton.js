import { HeartFilled, HeartTwoTone } from '@ant-design/icons'
import styled from '@emotion/styled'
import { useState } from 'react'

const HeartButton = () => {
  const [filled, setFilled] = useState(false)
  return (
    <StyledWrapper>
      <button id="star-wrapper" onClick={() => setFilled(!filled)}>
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
