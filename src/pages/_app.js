import Head from 'next/head'
import Script from 'next/script'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles/theme'
import mapLoadScript from 'src/constants/mapLoadScript'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>happyhouse</title>
      </Head>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services,clusterer&autoload=false`}
        strategy="afterInteractive"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <Script
        id="kakao-map-onload"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: mapLoadScript }}
        onLoad={() => console.log(`on loaded`)}
      />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
