import SearchInput from './SearchInput'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import { aptCodeState } from 'src/store/states'

const SearchGroup = () => {
  const aptCode = useRecoilValue(aptCodeState)
  return (
    <SearchGroupWrapper sideRenderd={aptCode}>
      <SearchInput />
    </SearchGroupWrapper>
  )
}
export default SearchGroup

const SearchGroupWrapper = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.sideRenderd ? 'rgba(43, 192, 228, 0.8);' : 'white'};
`
