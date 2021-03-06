import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import http from 'src/api/http'
import { aptCodeState, searchResultState } from 'src/store/states'
import RankSwiper from '../searchMenu/RankSwiper'
import SearchGroup from '../searchMenu/SearchGroup'
import LeftSideContent from './LeftSideContent'

const LeftSide = () => {
  const aptCode = useRecoilValue(aptCodeState)
  const searchResult = useRecoilValue(searchResultState)
  const [data, setData] = useState(false)
  useEffect(() => {
    if (!aptCode) return
    async function fetchData() {
      return await http.get(`/houses/deal?aptCode=${aptCode}`)
    }
    fetchData()
      .then(({ data }) => {
        setData({ mode: 'aptDetail', data: data.content })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [aptCode])

  useEffect(() => {
    if (!searchResult) return
    setData({ mode: 'searchResult', data: searchResult })
  }, [searchResult])

  return (
    <LeftSideWrapper isWholeRendered={!!data}>
      <SearchGroup setData={setData} data={data} />
      <div id="overflow-div">
        {data ? <LeftSideContent data={data} /> : <RankSwiper />}
      </div>
    </LeftSideWrapper>
  )
}

export default LeftSide

const LeftSideWrapper = styled.div`
  position: absolute;
  background-color: white;
  z-index: 1;
  top: ${(props) => (props.isWholeRendered ? '0px' : '1em')};
  left: ${(props) => (props.isWholeRendered ? '0px' : '1em')};

  display: flex;
  flex-direction: column;
  ${(props) => (props.isWholeRendered ? 'height: 100%;' : '')};
  max-height: 100%;
  max-width: 394px;

  #overflow-div {
    overflow: auto;
  }
`
