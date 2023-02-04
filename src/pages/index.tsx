import { fetchPosts, TPost, usePosts } from '@/api/posts'
import Page from '@/components/Page/Page'
import { Center, Container, Heading, Text, VStack } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { LoginSwitch } from '@/components/forPages/indexPage/LoginSwitch'

type THomePage = {
  posts: TPost[]
}
export default function Home(props: THomePage) {
  const res = usePosts()

  console.log('post clientSide', res)
  console.log('post serverSide', props.posts)

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
        <Center minH="100vh">
          <LoginSwitch
            onClickGuestMode={() => {}}
            onClickAdmin={() => {}}
            onClickUser={() => {}}
          />
        </Center>
      </Page>
    </>
  )
}

export const getStaticProps: GetStaticProps<THomePage> = async () => {
  const posts = await fetchPosts().then((res) => res.data)

  return {
    props: {
      posts,
    },
  }
}
