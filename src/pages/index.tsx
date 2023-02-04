import { fetchPosts, TPost, usePosts } from '@/api/posts'
import Page from '@/components/Page/Page'
import { Heading } from '@chakra-ui/layout'
import { GetStaticProps } from 'next';
import Head from 'next/head'

type THomePage = {
  posts: TPost[]
}
export default function Home(props: THomePage) {
  const res = usePosts();

  console.log('post clientSide', res);
  console.log('post serverSide', props.posts);
  
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

export const getStaticProps: GetStaticProps<THomePage> = async () => {
  const posts = await fetchPosts().then(res => res.data);

  return {
    props: {
      posts
    }
  }
}
