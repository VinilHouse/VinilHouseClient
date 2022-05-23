import styled from '@emotion/styled'
import { useState } from 'react'
import RankSwiper from './RankSwiper'
import RankToolTip from './RankToolTip'

const RankContainer = () => {
  const [showSwiper, setShowSwiper] = useState(true)

  const clickHandler = () => {
    setShowSwiper(!showSwiper)
  }

  console.log(showSwiper)
  return (
    <StyledWrapper>
      {showSwiper ? <RankSwiper /> : <RankToolTip />}
      <div onClick={clickHandler}>
        <SVGArrowIcon className="arrow-down" />
      </div>
    </StyledWrapper>
  )
}
export default RankContainer

const StyledWrapper = styled.div`
  position: relative;
  .arrow-down {
    position: absolute;
    top: 10px;
    right: 10px;
    transform: rotate(-90deg);
  }
`
