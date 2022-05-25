import styled from '@emotion/styled'
import React from 'react'
import { useState } from 'react'
import { Slider, InputNumber, Row, Col } from 'antd'
import { SliderMarks } from 'antd/lib/slider'
import { modalSlideVisibleState } from 'src/store/states'
import { useRecoilState } from 'recoil'

const FilterSlider = () => {
  const [isModalSlideVisibleState, setIsModalSlideVisibleState] =
    useRecoilState(modalSlideVisibleState)

  const [inputValue, setInputValue] = useState(1)

  const onChange = (newValue) => {
    setInputValue(newValue)
  }

  return (
    <StyledWrapper filterOn={isModalSlideVisibleState}>
      <Row>
        <Col span={2}>
          <h5 className="slide-title">가격</h5>
        </Col>
        <Col span={18}>
          <Slider
            min={1}
            max={20}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={1}>
          <InputNumber
            min={1}
            max={20}
            style={{ margin: '0 16px', width: '65px' }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <h5 className="slide-title">가격</h5>
        </Col>
        <Col span={18}>
          <Slider
            min={1}
            max={20}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={1}>
          <InputNumber
            min={1}
            max={20}
            style={{ margin: '0 16px', width: '65px' }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </StyledWrapper>
  )
}

export default FilterSlider

const StyledWrapper = styled.div`
  position: absolute;
  top: 190px;
  right: 130px;
  z-index: ${(props) => (props.filterOn ? 1 : -1)};
  .Col {
    color: black;
  }
`
