import Page from '@/components/Page/Page'
import { Heading } from '@chakra-ui/layout'
import Head from 'next/head'

export default function Home() {
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
      <Page>
        <Heading>The Blog</Heading>
      </Page>
    </>
  )
}
