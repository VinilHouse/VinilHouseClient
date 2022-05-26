import { ArrowLeftOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import { List } from 'antd'
import SearchResultItem from './SearchResultItem'

const SearchResult = ({ data }) => {
  return (
    <StyledWrapper>
      <div className="row">
        <ArrowLeftOutlined style={{ fontSize: '15px', padding: '7px' }} />
        <span className="title">{data.query} 검색 결과</span>
      </div>
      <List
        header={<div>아파트 / 오피스텔</div>}
        bordered
        dataSource={data.content}
        renderItem={(item) => <SearchResultItem aptData={item} />}
      />
    </StyledWrapper>
  )
}
export default SearchResult

const StyledWrapper = styled.div`
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(43, 192, 228, 0.8);
  }

  .title {
    font-size: 22px;
    margin-right: 150px;
  }

  .text {
    text-align: center;
  }
`
