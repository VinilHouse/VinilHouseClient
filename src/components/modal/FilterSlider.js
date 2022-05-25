import styled from '@emotion/styled'
import { Col, InputNumber, Row, Slider } from 'antd'
import React, { useState } from 'react'

const FilterSlider = () => {
  const [inputValue, setInputValue] = useState(1)

  const onChange = (newValue) => {
    setInputValue(newValue)
  }

  return (
    <StyledWrapper>
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
  .Col {
    color: black;
  }
`
