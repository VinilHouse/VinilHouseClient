import styled from '@emotion/styled'
import { Table } from 'antd'

const columns = [
  {
    title: '거리',
    dataIndex: 'dist',
    key: 'dist',
    render: (text) => <div>{text}</div>,
  },
  {
    title: '나만의 장소',
    dataIndex: 'alias',
    key: 'alias',
    render: (text) => <div>{text}</div>,
  },
  {
    title: '주소',
    dataIndex: 'address',
    key: 'address',
    render: (text) => <div>{text}</div>,
  },
]

const AptDistRank = ({ distData }) => {
  console.log(distData)

  const data = distData.map((e, idx) => {
    return {
      key: `${idx}`,
      dist: `${e.dist.toFixed(2)}KM`,
      alias: e.memberLocation.alias,
      address: e.memberLocation.address,
    }
  })

  return (
    <StyledWrapper>
      <div id="title">나만의 장소로부터의 거리</div>
      <Table columns={columns} dataSource={data} size="small"></Table>
    </StyledWrapper>
  )
}

export default AptDistRank

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  right: -300px;
  width: 300px;

  background-color: white;
  .ant-table-cell {
    text-align: center;
  }
  #title {
    padding: 10px;
    font-size: 15px;
    font-weight: 500;
  }
`
