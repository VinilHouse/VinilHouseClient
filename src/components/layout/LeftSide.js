import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { aptState } from 'src/store/states'
import AptDetail from '../apt/AptDetail'
import RankSwiper from '../searchMenu/RankSwiper'
import SearchGroup from '../searchMenu/SearchGroup'

const LeftSide = () => {
  const aptData = useRecoilValue(aptState)
  return (
    <LeftSideWrapper>
      <SearchGroup />
      {aptData ? <AptDetail data={aptData} /> : <RankSwiper />}
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
