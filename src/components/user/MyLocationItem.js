import styled from '@emotion/styled'
import { Descriptions } from 'antd'

const MyLocationItem = ({ data }) => {
  console.log(data)

  return (
    <StyledWrapper>
      {data.map((e) => {
        return (
          <Descriptions size="small" column={3} key={`${e.alias}`}>
            <Descriptions.Item label="별칭">{e.alias}</Descriptions.Item>
            <Descriptions.Item label="주소">{e.address}</Descriptions.Item>
          </Descriptions>
        )
      })}
    </StyledWrapper>
  )
}
export default MyLocationItem

const StyledWrapper = styled.div`
  margin-top: 10px;
`
