import {
  ArrowLeftOutlined,
  CloseOutlined,
  CommentOutlined,
} from '@ant-design/icons'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import AptChartTab from './AptChartTab'
import AptDealList from './AptDealList'
import AptImage from './AptImage'

const areaType = [143.56, 178.35]

const AptDetail = ({ data }) => {
  console.log(data)

  return (
    <StyledWrapper>
      <AptImage src={data.houseInfoResponseDto.img} />
      <div id="detail-header">
        <div className="row">
          <ArrowLeftOutlined style={{ fontSize: '15px', padding: '7px' }} />
          <span className="title">{data.houseInfoResponseDto.name}</span>
          <CloseOutlined style={{ fontSize: '15px', padding: '7px' }} />
        </div>
        <div className="text sub-title">
          <span>
            {data.houseInfoResponseDto.dongName}{' '}
            {data.houseInfoResponseDto.jibun}{' '}
            {data.houseInfoResponseDto.buildYear}년 건축
          </span>
        </div>
      </div>

      <div className="row">
        <AptChartTab areaType={areaType} />
      </div>

      <div className="row">
        <AptDealList />
      </div>
    </StyledWrapper>
  )
}
export default AptDetail

const StyledWrapper = styled.div`
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    line-height: 0;
  }

  .sub-title {
    font-size: 14px;
    font-weight: 500;
    color: gray;
  }
  .text {
    text-align: center;
  }
`
