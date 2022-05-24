import {
  ArrowLeftOutlined,
  CloseOutlined,
  CommentOutlined,
} from '@ant-design/icons'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'
import AptPriceChart from './AptPriceChart'

const AptDetail = ({ data }) => {
  return (
    <StyledWrapper>
      <div id="detail-header">
        <div className="row">
          <ArrowLeftOutlined style={{ fontSize: '20px', padding: '10px' }} />
          <span className="title">{data.houseInfoResponseDto.name}</span>
          <CloseOutlined style={{ fontSize: '20px', padding: '10px' }} />
        </div>
        <div className="text sub-title">
          <span>
            {data.houseInfoResponseDto.dongName}{' '}
            {data.houseInfoResponseDto.jibun}{' '}
            {data.houseInfoResponseDto.buildYear}년 건축
          </span>
          <CommentOutlined
            style={{ float: 'right', fontSize: '30px', padding: '10px' }}
          />
        </div>
      </div>

      <div className="row">
        <AptPriceChart />
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
    font-size: 30px;
    font-weight: bold;
  }

  .sub-title {
    font-size: 20px;
    font-weight: 500;
  }
  .text {
    text-align: center;
  }
`
