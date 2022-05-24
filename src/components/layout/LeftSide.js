import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { aptCodeState } from 'src/store/states'
import AptDetail from '../apt/AptDetail'
import RankSwiper from '../searchMenu/RankSwiper'
import SearchGroup from '../searchMenu/SearchGroup'
import axios from 'axios'

const LeftSide = () => {
  const aptCode = useRecoilValue(aptCodeState)
  const [aptData, setAptData] = useState()
  useEffect(() => {
    if (!aptCode) return
    async function fetchData() {
      return await axios.get(
        `http://ec2-15-152-141-201.ap-northeast-3.compute.amazonaws.com/api/houses/deal?aptCode=${aptCode}`,
      )
    }
    fetchData()
      .then(({ data }) => {
        setAptData(data.content)
      })
      .catch((err) => {
        console.log(`err occured!`)
        console.log(err)
      })
  }, [aptCode])

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
