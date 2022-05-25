import Image from 'next/image'

const myLoader = ({ src, width, height, quality }) => {
  return `${src}?w=${width}&h=${height}&q=${quality || 70}`
}

const AptImage = ({ src }) => {
  if (src == 'NONE' || !src) return <></>
  return (
    <Image
      loader={myLoader}
      src={src}
      alt="아파트 이미지"
      width={364}
      height={200}
    />
  )
}

export default AptImage
