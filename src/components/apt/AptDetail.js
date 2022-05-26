import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import http from 'src/api/http'
import { isLogInState } from 'src/store/states'
import AptChartTab from './AptChartTab'
import AptDistRank from './AptDistRank'
import AptImage from './AptImage'
import HeartButton from './HeartButton'

const AptDetail = ({ data }) => {
  const [distData, setDistData] = useState()
  const isLogIn = useRecoilValue(isLogInState)

  useEffect(() => {
    http
      .get(`/members/dist?aptCode=${data.houseInfoResponseDto.aptCode}`)
      .then(({ data }) => {
        setDistData(data.content.groups)
      })
  }, [data])

  return (
    <StyledWrapper>
      <AptImage
        src={data.houseInfoResponseDto?.img}
        aptCode={data.houseInfoResponseDto.aptCode}
      />
      <StyledHeader imgRendered={data.houseInfoResponseDto?.img !== 'NONE'}>
        <div className="row first">
          <div className="title">{data.houseInfoResponseDto?.name}</div>
          {data.houseInfoResponseDto?.img === 'NONE' && (
            <HeartButton aptCode={data.houseInfoResponseDto.aptCode} />
          )}
        </div>
        <div className="row text sub-title">
          <span>
            {data.houseInfoResponseDto?.dongName}{' '}
            {data.houseInfoResponseDto?.jibun}{' '}
            {data.houseInfoResponseDto?.buildYear}년 건축
          </span>
        </div>
      </StyledHeader>

      <div className="row">
        <AptChartTab areaType={data.groupList} />
      </div>

      {isLogIn && <AptDistRank distData={distData} />}
    </StyledWrapper>
  )
}
export default AptDetail

const StyledWrapper = styled.div`
  #svg-wrapper {
    background-color: white;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
  }

  .sub-title {
    font-size: 14px;
    font-weight: 500;
  }
  .text {
    text-align: center;
  }
`

const StyledHeader = styled.div`
  padding-left: 10px;
  background-color: rgba(43, 192, 228, 0.8);
  position: ${(props) => (props.imgRendered ? 'relative' : 'static')};
  top: ${(props) => (props.imgRendered ? '-7px' : '0px')};
`
