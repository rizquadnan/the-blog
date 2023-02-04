import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="My Blog is a social media in form of blog posts. Share thoughts and ideas here! " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        My Blog
      </div>
    </>
  )
}
