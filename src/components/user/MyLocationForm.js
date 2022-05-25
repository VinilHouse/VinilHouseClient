import styled from '@emotion/styled'
import { Input } from 'antd'
import { useEffect, useState } from 'react'

const { Search } = Input

const MyLocationForm = ({ setAddInput }) => {
  const [data, setData] = useState()
  const [alias, setAlias] = useState()

  const onSearch = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        setData(data.address)
      },
    }).open()
  }

  useEffect(() => {
    setAddInput({ alias: alias, address: data })
  }, [data, alias])

  return (
    <StyledWrapper>
      <div id="input-wrapper">
        <Input placeholder="별칭" onChange={(e) => setAlias(e.target.value)} />
      </div>
      <div id="search-wrapper">
        <Search
          placeholder="주소"
          allowClear
          enterButton="주소검색"
          onSearch={onSearch}
          value={data}
        />
      </div>
    </StyledWrapper>
  )
}

export default MyLocationForm

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  #search-wrapper {
  }
  #input-wrapper {
    width: 120px;
  }
`
