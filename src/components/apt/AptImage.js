import styled from '@emotion/styled'
import Image from 'next/image'
import HeartButton from './HeartButton'

const myLoader = ({ src, width, height, quality }) => {
  return `${src}?w=${width}&h=${height}&q=${quality || 70}`
}

const AptImage = ({ src, aptCode }) => {
  if (src === 'NONE' || !src) return <></>

  return (
    <StyledWrapper>
      <Image
        loader={myLoader}
        src={src}
        alt="아파트 이미지"
        width={394}
        height={230}
      />
      <HeartButton aptCode={aptCode} />
    </StyledWrapper>
  )
}
export default AptImage

const StyledWrapper = styled.div`
  max-width: 394px;
`
