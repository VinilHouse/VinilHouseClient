import styled from '@emotion/styled'
import Image from 'next/image'
import { logo } from 'public/assets/img'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const SearchInput = () => {
  return (
    <SearchInputWrapper>
      <Image src={logo} alt="happy house logo" width={40} height={40} />
      <SearchInputTag>
        <Input placeholder="아파트 또는 지역명으로 검색" />
      </SearchInputTag>
      <ImageWrapper>
        <SearchOutlined style={{ fontSize: '25px' }} />
      </ImageWrapper>
    </SearchInputWrapper>
  )
}

export default SearchInput

const SearchInputTag = styled.div`
  width: 280px;
`

const SearchInputWrapper = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 7px 7px 0px 7px;
`

const ImageWrapper = styled.div`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`
