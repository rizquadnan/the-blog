import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/theme'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  )
}
