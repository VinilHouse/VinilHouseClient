import styled from '@emotion/styled'
import { List } from 'antd'
import { useRecoilState } from 'recoil'
import { userLocation } from 'src/store/states'

const SearchResultItem = ({ aptData }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setLoc] = useRecoilState(userLocation)
  const onClickHandler = () => {
    setLoc({ lat: aptData.lat, lng: aptData.lng })
  }
  return (
    <List.Item onClick={onClickHandler}>
      <StyledWrapper>
        <div className="search-result-title">
          {aptData.dongName} {aptData.name}
        </div>
        <div className="search-result-subtitle">
          {aptData.dongName} {aptData.jibun} / {aptData.buildYear}년 건축
        </div>
      </StyledWrapper>
    </List.Item>
  )
}
export default SearchResultItem

const StyledWrapper = styled.div`
  cursor: pointer;
  .search-result-subtitle {
    font-size: 13px;
    color: gray;
  }
`
