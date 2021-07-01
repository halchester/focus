import { AppProps } from 'next/app'
import { theme } from '../utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '../components/Layout'
import { queryClient } from '../utils/query'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
