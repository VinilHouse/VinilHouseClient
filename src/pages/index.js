import Head from 'next/head'
import MainScreen from 'src/screens/Mainscreen'

const Home = () => {
  return (
    <div>
      <Head>
        <title>happyhouse</title>
        <meta name="description" content="아파트 거래정보 검색 찾기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainScreen />
    </div>
  )
}

export default Home
