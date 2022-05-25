import React from 'react'
import { Tabs } from 'antd'
import AptPriceChart from './AptPriceChart'
import areaToString from 'src/utils/areaToString'
import styled from '@emotion/styled'
import AptDealList from './AptDealList'

const { TabPane } = Tabs

const onChange = (key) => {
  console.log(key)
}

const AptChartTab = ({ areaType }) => {
  return (
    <StyledWrapper>
      <Tabs
        defaultActiveKey="0"
        onChange={onChange}
        centered
        size={'large'}
        tabBarStyle={{ width: '100%', height: '30px' }}
      >
        {areaType ? (
          areaType.map((e, idx) => {
            return (
              <TabPane tab={`${e.py}평`} key={idx}>
                <AptPriceChart monthData={e.dealList} />
                <AptDealList dealData={e.dealList} />
              </TabPane>
            )
          })
        ) : (
          <div></div>
          // <TabPane tab="Tab 1" key="0">
          //   <AptPriceChart monthData={null} />
          // </TabPane>
        )}
      </Tabs>
    </StyledWrapper>
  )
}

export default AptChartTab

const StyledWrapper = styled.div`
  width: 100%;
`
