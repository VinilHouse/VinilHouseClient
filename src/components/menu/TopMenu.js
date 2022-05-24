import styled from '@emotion/styled'
import { Button } from 'antd'
import { useRecoilState } from 'recoil'
import { modalVisibleState } from 'src/store/states'

const TopMenu = () => {
  const [_, setIsModalVisible] = useRecoilState(modalVisibleState)

  const onClickHandler = () => {
    setIsModalVisible((prevState) => {
      // console.log(prevState)
      return !prevState
    })
  }
  return (
    <StyledWrapper>
      <Button type="primary" onClick={onClickHandler}>
        Open Modal
      </Button>
    </StyledWrapper>
  )
}
export default TopMenu

const StyledWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  z-index: 2;
`
