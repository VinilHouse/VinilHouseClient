import styled from '@emotion/styled'
import { Button, Avatar } from 'antd'
import { useRecoilState } from 'recoil'
import { modalLoginVisibleState, userLocation } from 'src/store/states'
import { AimOutlined, UserOutlined, ControlOutlined } from '@ant-design/icons'
import FilterSlider from 'src/components/modal/FilterSlider'
import { useState } from 'react'

const TopMenu = () => {
  const [_, setIsModalLoginVisible] = useRecoilState(modalLoginVisibleState)
  const [__, setUserLocation] = useRecoilState(userLocation)
  const [isVisible, setIsVisible] = useState(false)
  const onUserClick = () => {
    setIsModalLoginVisible((prevState) => {
      console.log(prevState)
      return !prevState
    })
  }

  const onUserAimClick = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    function success(pos) {
      var crd = pos.coords
      setUserLocation({
        lat: crd.latitude,
        lng: crd.longitude,
      })
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  const onFilterClick = () => {
    setIsVisible(!isVisible)
  }

  return (
    <StyledWrapper>
      <div className="menu-div">
        <UserOutlined onClick={onUserClick} />
        <h5>LOGIN</h5>
      </div>
      <div className="menu-div">
        <AimOutlined onClick={onUserAimClick} />
        <h5>MYLOC</h5>
      </div>
      <div className="menu-div">
        <ControlOutlined onClick={onFilterClick} />
        <h5>FILTER</h5>
        {isVisible && <FilterSlider />}
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
    text-align: center;
    .anticon {
      font-size: 40px;
      color: '#999999';
    }
  }
`
