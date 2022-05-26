import { QuestionCircleFilled } from '@ant-design/icons'
import styled from '@emotion/styled'
import { Button, PageHeader, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import http from 'src/api/http'
import MyLocationForm from './MyLocationForm'
import MyLocationItem from './MyLocationItem'

const MyLocation = () => {
  const [data, setData] = useState()
  const [adding, setAdding] = useState(false)
  const [addInput, setAddInput] = useState()

  const addHandler = () => {
    http
      .post('/members/location', addInput)
      .then((data) => {
        alert('등록 완료!')
        getLocations()
      })
      .catch((err) => {
        alert('등록 실패!')
        console.log(err)
      })
    setAdding(!adding)
  }

  const getLocations = () => {
    http
      .get('/members/location')
      .then(({ data }) => {
        setData(data.content)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getLocations()
  }, [])

  return (
    <StyledWrapper>
      <PageHeader ghost={false} title="자주가는 곳">
        <Tooltip
          placement="top"
          title="자주가는 곳을 설정해주시면 아파트와의 거리를 보여드리고 있어요!"
          className="top-tooltip"
        >
          <QuestionCircleFilled />
        </Tooltip>
        <div id="add-button-wrapper">
          {adding ? (
            <Button type="primary" onClick={addHandler}>
              등록
            </Button>
          ) : (
            <Button type="primary" onClick={() => setAdding(!adding)}>
              추가하기
            </Button>
          )}
        </div>
        {adding && <MyLocationForm setAddInput={setAddInput} />}
        {data && data.length !== 0 ? (
          <MyLocationItem data={data} />
        ) : (
          <div id="text">자주가는 곳을 추가해주세요!</div>
        )}
      </PageHeader>
    </StyledWrapper>
  )
}

export default MyLocation

const StyledWrapper = styled.div`
  .top-tooltip {
    position: absolute;
    top: 21px;
    left: 137px;
  }
  #add-button-wrapper {
    position: absolute;
    top: 16px;
    right: 25px;
  }
  #text {
    margin: 10px;
  }
`
