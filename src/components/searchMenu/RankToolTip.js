import styled from '@emotion/styled'

const RankToolTip = ({ ranks }) => {
  console.log(ranks)
  return (
    <StyledWrapper>
      <div>
        {ranks.map((data, idx) => {
          return (
            <div className="rank-item" key={`issues-${idx}`}>
              <div className={idx === 9 ? 'rank-number' : 'rank-number'}>
                {idx + 1}
              </div>
              <span id="rank-text">
                {data.houseInfoResponseDto.name} - {data.popular}명
              </span>
            </div>
          )
        })}
      </div>
    </StyledWrapper>
  )
}

export default RankToolTip

const StyledWrapper = styled.div`
  padding: 10px;

  .tooltip-label {
    font-weight: bold;
    letter-spacing: -0.9px;
    margin-right: 26px;
    color: black;
  }

  .list {
    height: 150px;
    width: 78%;
    /* padding: 8px 0; */
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .rank-item {
    align-items: center;
    margin: 0 0 10px;
    opacity: 0.8;
    width: 50%;
    display: flex;

    & button {
      background: transparent;
    }

    &:hover {
      opacity: 1;

      .rank-number {
        background: color(--color-main) !important;
      }
    }
  }

  .rank-number {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    color: white;
    border-radius: 5px;
    background-color: black;
    opacity: 0.3;
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .arrow-up {
    margin-left: 12px;
    transform: rotate(90deg);
    g g:last-child path {
      fill: black;
    }
  }

  #rank-text {
    font-size: 15px;
  }
`
