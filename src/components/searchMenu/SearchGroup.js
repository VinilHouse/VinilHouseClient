import { CloseOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import SearchInput from './SearchInput'

const SearchGroup = ({ setData, data }) => {
  return (
    <SearchGroupWrapper sideRenderd={data}>
      <SearchInput />
      <CloseOutlined
        style={{ fontSize: '15px', padding: '7px' }}
        onClick={() => setData(false)}
      />
    </SearchGroupWrapper>
  )
}
export default SearchGroup

const SearchGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.sideRenderd !== false ? 'rgba(43, 192, 228, 0.8);' : 'white'};
`
