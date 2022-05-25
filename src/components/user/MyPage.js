import styled from '@emotion/styled'
import { List, Table } from 'antd'
import { useEffect, useState } from 'react'
import http from 'src/api/http'
import { priceToString } from 'src/utils'

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <div>{text}</div>,
  },
  {
    title: '주소',
    dataIndex: 'address',
    key: 'address',
    render: (text) => <div>{text}</div>,
  },
  {
    title: '평균가격',
    dataIndex: 'dealAmount',
    key: 'dealAmount',
    render: (text) => <div>{text}</div>,
  },
]

const MyPage = () => {
  const [favorites, setFavorites] = useState()
  const [data, setData] = useState()
  useEffect(() => {
    http
      .get('/houses/favorites')
      .then(({ data }) => {
        console.log(data)
        setFavorites(data.content)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (!favorites) return

    const data = favorites.map((e, idx) => {
      return {
        key: `${idx}`,
        name: e.name,
        address: `${e.dongName} ${e.jibun}`,
        dealAmount: `${priceToString(e.avgPrice)}`,
      }
    })
    setData(data)
  }, [favorites])

  return (
    <StyledWrapper>
      <div>관심 아파트</div>
      <Table columns={columns} dataSource={data} size="small" />
    </StyledWrapper>
  )
}

export default MyPage

const StyledWrapper = styled.div``
