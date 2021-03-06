import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import http from 'src/api/http'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import RankToolTip from './RankToolTip'
import SVGArrowIcon from './svg/down-arrow.svg'

// SwiperCore.use([Pagination, Autoplay])

const RankSwiper = () => {
  const [data, setData] = useState([])
  const [showSwiper, setShowSwiper] = useState(true)

  const clickHandler = () => {
    setShowSwiper(!showSwiper)
  }

  useEffect(() => {
    const result = http.get(`/houses/rank`)

    result
      .then((data) => {
        setData(data.data.content)
      })
      .catch((e) => {
        console.log('error occured! : ' + e)
      })
  }, [])

  if (!data || data.length === 0) return <></>

  return (
    <StyledLayout>
      <div id="search-first-row">
        <div className="label">실시간 인기 아파트</div>
        <div
          onClick={clickHandler}
          style={{ marginLeft: 'auto', paddingRight: '10px' }}
        >
          <SVGArrowIcon className={`arrow ${showSwiper ? 'down' : 'up'}`} />
        </div>
      </div>
      {showSwiper ? (
        <div id="swiper-wrapper">
          <Swiper
            direction={'vertical'}
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2000 }}
            speed={800}
            loop={true}
            className="vertical-swiper"
            spaceBetween={6}
          >
            {data.map((e, idx) => {
              return (
                <SwiperSlide key={`realtime-rank-${idx}`}>
                  <div
                    className={idx === 9 ? 'rank-number last' : 'rank-number'}
                  >
                    {idx + 1}
                  </div>
                  <span id="rank-text">
                    {e.houseInfoResponseDto.name} - {e.popular}명
                  </span>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      ) : (
        <RankToolTip ranks={data} />
      )}
    </StyledLayout>
  )
}

export default RankSwiper

const StyledLayout = styled.div`
  width: 100%;
  position: relative;

  .label {
    font-size: 20px;
    font-weight: bold;
    padding-left: 10px;
  }

  #search-first-row {
    display: flex;
    flex-direction: row;
    padding-bottom: 5px;
    align-items: center;
  }

  #swiper-wrapper {
    padding: 5px 10px;
  }

  .vertical-swiper {
    height: 22px;

    .swiper-slide {
      display: flex;
      align-items: center;
    }
  }

  .arrow {
    transition: 0.3s;
    float: right;
  }
  .down {
    transform: rotate(-90deg);
  }
  .up {
    transform: rotate(90deg);
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

    &.last {
      padding: 3px 4px;
    }
  }

  #rank-text {
    font-size: 15px;
  }
`
