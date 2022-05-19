import Head from 'next/head'
import MainScreen from 'src/screens/Mainscreen'
// import { Map, MapMarker } from 'react-kakao-maps-sdk'

const Home = () => {
  return (
    <div>
      <Head>
        <title>happyhouse</title>
        <meta name="description" content="아파트 거래정보 검색 찾기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '360px' }}
      ></Map> */}
      <MainScreen />
    </div>
  )
}

export default Home
