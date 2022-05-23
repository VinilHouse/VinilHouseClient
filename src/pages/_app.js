import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles/theme'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta> */}
        <title>happyhouse</title>
      </Head>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  )
}

export default MyApp
