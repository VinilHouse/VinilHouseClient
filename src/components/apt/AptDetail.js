import styled from '@emotion/styled'

const AptDetail = ({ data }) => {
  console.log(data)
  return (
    <StyledWrapper>
      <div id="detail-header">
        <div id="detail-header-first-row">
          <div>뒤로</div>
          <span>{data.name}</span>
          <div>x표시</div>
        </div>
        <div>
          <span>
            {data.dongName} {data.jibun} {data.buildYear}년 건축
          </span>
          <div>댓글</div>
        </div>
      </div>

      <div>차트</div>
    </StyledWrapper>
  )
}
export default AptDetail

const StyledWrapper = styled.div`
  #detail-header {
  }

  #detail-header-first-row {
    display: flex;
    justify-content: space-between;
  }
`
