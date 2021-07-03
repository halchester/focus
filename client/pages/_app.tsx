import { AppProps } from 'next/app'
import { theme } from '../utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import { queryClient } from '../utils/query'
import { QueryClientProvider } from 'react-query'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Focus</title>
        <meta name="description" content="Your best studying mate!" />
        <link rel="icon" type="image/png" href="/focus.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
