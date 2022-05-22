import SearchInput from './SearchInput'
import styled from '@emotion/styled'

const SearchGroup = () => {
  return (
    <SearchGroupWrapper>
      <SearchInput />
    </SearchGroupWrapper>
  )
}
export default SearchGroup

const SearchGroupWrapper = styled.div`
  display: flex;,
`
