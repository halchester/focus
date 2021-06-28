import { AppProps } from 'next/app'
import { theme } from '../utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
