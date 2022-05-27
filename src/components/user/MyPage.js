import styled from '@emotion/styled'
import { Table } from 'antd'
import { useEffect, useState } from 'react'
import http from 'src/api/http'
import { priceToString } from 'src/utils'
import MyLocation from './MyLocation'
import { favoritesState } from 'src/store/states'
import { useRecoilValue } from 'recoil'

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
  const favoritesData = useRecoilValue(favoritesState)

  useEffect(() => {
    http
      .get('/houses/favorites')
      .then(({ data }) => {
        setFavorites(data.content)
      })
      .catch((err) => console.log(err))

    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    console.log('changed!!!!')
    http
      .get('/houses/favorites')
      .then(({ data }) => {
        setFavorites(data.content)
      })
      .catch((err) => console.log(err))
  }, [favoritesData])

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
      <MyLocation />
      <div id="title">관심 아파트</div>
      <div id="table-wrapper">
        <Table
          columns={columns}
          dataSource={data}
          size="small"
          style={{ width: '90%', margin: 'auto' }}
        />
      </div>
    </StyledWrapper>
  )
}

export default MyPage

const StyledWrapper = styled.div`
  #title {
    margin: 10px 20px;
    font-size: 20x;
    font-weight: 600;
    line-height: 32px;
  }
  #table-wrapper {
    display: flex;
    justify-items: center;
  }
`
