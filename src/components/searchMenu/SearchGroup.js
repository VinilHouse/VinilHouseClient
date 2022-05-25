import SearchInput from './SearchInput'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { aptCodeState } from 'src/store/states'
import { CloseOutlined } from '@ant-design/icons'

const SearchGroup = () => {
  const aptCode = useRecoilValue(aptCodeState)
  return (
    <SearchGroupWrapper sideRenderd={aptCode}>
      <SearchInput />
      <CloseOutlined style={{ fontSize: '15px', padding: '7px' }} />
    </SearchGroupWrapper>
  )
}
export default SearchGroup

const SearchGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.sideRenderd ? 'rgba(43, 192, 228, 0.8);' : 'white'};
`
