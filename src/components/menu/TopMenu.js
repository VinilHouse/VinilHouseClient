import styled from '@emotion/styled'
import { Button, Avatar } from 'antd'
import { useRecoilState } from 'recoil'
import { modalLoginVisibleState } from 'src/store/states'
import { AimOutlined, UserOutlined, ControlOutlined } from '@ant-design/icons'

const TopMenu = () => {
  const [_, setIsModalLoginVisible] = useRecoilState(modalLoginVisibleState)

  const onClickHandler = () => {
    setIsModalLoginVisible((prevState) => {
      console.log(prevState)
      return !prevState
    })
  }

  return (
    <StyledWrapper>
      <div className="menu-div">
        <UserOutlined onClick={onClickHandler} />
      </div>
      <div className="menu-div">
        <AimOutlined />
      </div>
      <div className="menu-div">
        <ControlOutlined />
      </div>
    </StyledWrapper>
  )
}
export default TopMenu

const StyledWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  z-index: 2;
  .menu-div {
    margin-bottom: 15px;
    background-color: white;
    border: 1px solid #909090;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    padding: 3px;
    .anticon {
      font-size: 40px;
      color: '#999999';
    }
  }
`
