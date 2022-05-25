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
        <Col span={5}>
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
        <Col span={5}>
          <h5 className="slide-title">면적</h5>
        </Col>
        <Col span={18}>
          <Slider
            min={3}
            max={40}
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
        <Col span={5}>
          <h5 className="slide-title">연도</h5>
        </Col>
        <Col span={18}>
          <Slider
            min={2006}
            max={2022}
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
  right: 80px;
  background-color: grey;
  padding-left: 10px;
  padding-right: 80px;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 1px solid #909090;
  border-radius: 5px;
  .slide-title {
    padding-top: 5px;
  }
`
