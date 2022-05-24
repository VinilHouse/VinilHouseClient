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

const AptDetail = ({ data }) => {
  return (
    <StyledWrapper>
      <AptImage src={data.houseInfoResponseDto.img} />
      <StyledHeader imgRendered={data.houseInfoResponseDto.img != 'NONE'}>
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
      </StyledHeader>

      <div className="row">
        <AptChartTab areaType={data.groupList} />
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
  }
  .text {
    text-align: center;
  }
`
const StyledHeader = styled.div`
  background-color: rgba(43, 192, 228, 0.8);
  position: ${(props) => (props.imgRendered ? 'relative' : 'static')};
  top: ${(props) => (props.imgRendered ? '-6px' : '0px')};
`
