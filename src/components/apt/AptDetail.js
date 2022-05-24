import {
  ArrowLeftOutlined,
  CloseOutlined,
  CommentOutlined,
} from '@ant-design/icons'
import styled from '@emotion/styled'
import 'antd/dist/antd.css'

const AptDetail = ({ data }) => {
  console.log(data)
  return (
    <StyledWrapper>
      <div id="detail-header">
        <div class="row">
          <ArrowLeftOutlined style={{ padding: '10px' }} />
          <span class="title">{data.name}</span>
          <CloseOutlined style={{ fontSize: '30px', padding: '10px' }} />
        </div>
        <div class="text sub-title">
          <span>
            {data.dongName} {data.jibun} {data.buildYear}년 건축
          </span>
        </div>
      </div>

      <div class="row">
        <div>차트</div>
        <CommentOutlined style={{ fontSize: '30px', padding: '10px' }} />
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
