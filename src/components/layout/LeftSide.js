import styled from '@emotion/styled'
import RankSwiper from '../searchMenu/RankSwiper'
import SearchGroup from '../searchMenu/SearchGroup'

const LeftSide = () => {
  return (
    <LeftSideWrapper>
      <SearchGroup />
      <RankSwiper />
    </LeftSideWrapper>
  )
}

export default LeftSide

const LeftSideWrapper = styled.div`
  position: absolute;
  background-color: white;
  z-index: 1;
  top: 2em;
  left: 2em;
  display: flex;
  flex-direction: column;
`
