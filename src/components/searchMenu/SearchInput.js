import { useState } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import { Input } from 'antd'
import { logo } from 'public/assets/img'
import http from 'src/api/http'
import { useRecoilState } from 'recoil'
import { searchResultState } from 'src/store/states'

const SearchInput = () => {
  const [input, setInput] = useState('')
  const [_, setSearchResultState] = useRecoilState(searchResultState)

  const onSubmitHandler = async () => {
    const result = await http.get(`/houses/search?prefix=${input}`)

    setSearchResultState({ query: input, content: result?.data?.content })
  }
  return (
    <SearchInputWrapper>
      <Image src={logo} alt="happy house logo" width={40} height={40} />
      <SearchInputTag>
        <Input.Search
          placeholder="아파트 또는 지역명으로 검색"
          onChange={(e) => setInput(e.target.value)}
          onSearch={onSubmitHandler}
        />
      </SearchInputTag>
    </SearchInputWrapper>
  )
}

export default SearchInput

const SearchInputTag = styled.div`
  width: 310px;
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
