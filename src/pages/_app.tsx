import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/theme'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Blog</title>
        <meta
          name="description"
          content="The Blog is a social media in form of blog posts. Share thoughts and ideas here! "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme} resetCSS>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </>
  )
}
