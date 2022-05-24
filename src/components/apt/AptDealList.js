import React from 'react'
import { Table, Tag, Space } from 'antd'
import styled from '@emotion/styled'

const columns = [
  {
    title: '계약일',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <div>{text}</div>,
  },
  {
    title: '가격',
    dataIndex: 'dealAmount',
    key: 'dealAmount',
    render: (text) => <div>{text}</div>,
  },
  {
    title: '층',
    dataIndex: 'floor',
    key: 'floor',
    render: (text) => <div>{text}층</div>,
  },
]

const props = [
  {
    key: '1',
    aptCode: 34599,
    area: '97.8',
    dealAmount: 46000,
    dealDay: 18,
    dealMonth: 1,
    dealYear: 2007,
    floor: '6',
    id: 7763850,
    rentMoney: null,
    type: null,
  },
]

const data = props.map((e, idx) => {
  return {
    key: `${idx}`,
    date: `${e.dealYear}.${e.dealMonth}.${e.dealDay}`,
    dealAmount: e.dealAmount,
    floor: e.floor,
  }
})

const AptDealList = () => {
  return (
    <StyledWrapper>
      <Table columns={columns} dataSource={data} />
    </StyledWrapper>
  )
}
export default AptDealList

const StyledWrapper = styled.div`
  width: 100%;
`
