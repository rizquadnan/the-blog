import Page from '@/components/Page/Page'
import { Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/Bottombar'
import { Button, useColorModeValue } from '@chakra-ui/react'
import { Modal } from '@/components/uiKit/Modal'
import { useState } from 'react'
import { TPost } from '@/api/posts'
import { MOCK_POSTS } from '@/mocks/posts'
import PostCard from '@/components/forPages/homePage/PostCard/PostCard'
import { PostForm } from '@/components/forPages/homePage/PostForm'
import { normalizeUser, TUser } from '@/api/users'
import { MOCK_USER } from '@/mocks/auth'
import { useRouter } from 'next/router'

export default function Home() {
  const [modalType, setModalType] = useState<'create' | 'update' | 'none'>(
    'none',
  )
  const [posts, setPosts] = useState<TPost[]>(MOCK_POSTS)
  const [isPostsLoading, setIsPostsLoading] = useState(false)

  const [user] = useState<TUser>(normalizeUser(MOCK_USER))

  const headerBackground = useColorModeValue('white', 'gray.800')

  const router = useRouter()

  return (
    <>
      <Head>
        <title>{createPageTitle('Home')}</title>
      </Head>
      <Page>
        <LoggedInLayout
          sideNav={<Sidebar selectedNav="home" onLogout={() => {}} />}
          bottomNav={<Bottombar selectedNav="home" onLogout={() => {}} />}
        >
          <VStack>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              top="0px"
              position="sticky"
              zIndex={2}
              background={headerBackground}
              py="12px"
            >
              <Heading>Home</Heading>
              <Button
                variant="ghost"
                colorScheme="orange"
                onClick={() => setModalType('create')}
              >
                Add Post
              </Button>
            </Flex>

            <Grid
              templateColumns={{
                base: '1fr',
                lg: '1fr 1fr',
                xl: '1fr 1fr 1fr',
              }}
              gap="24px"
            >
              {posts.map((post) => (
                <GridItem key={post.id}>
                  <PostCard
                    title={post.title}
                    content={post.body}
                    author={String(post.user_id)}
                    onClickEdit={() => setModalType('update')}
                    onClickCard={() => router.push(`/posts/${post.id}`)}
                    imageProps={{
                      src: `https://picsum.photos/seed/${post.id}1000/1000`,
                      alt: `Thumbnail for Post: ${post.title}`,
                    }}
                  />
                </GridItem>
              ))}
            </Grid>

            <Center mt="24px !important">
              <Button
                variant="outline"
                colorScheme="orange"
                w="100%"
                isLoading={isPostsLoading}
                onClick={() => {
                  setIsPostsLoading(true)
                  setTimeout(() => {
                    setIsPostsLoading(false)
                    setPosts((prev) => {
                      return [...prev, ...MOCK_POSTS]
                    })
                  }, 2000)
                }}
              >
                Load more
              </Button>
            </Center>
          </VStack>
        </LoggedInLayout>

        <Modal
          title="Create Post"
          isOpen={modalType === 'create'}
          onClose={() => setModalType('none')}
          body={
            <PostForm variant="create" author={user.name} onSubmit={() => {}} />
          }
        />
        <Modal
          title="Update Post"
          isOpen={modalType === 'update'}
          onClose={() => setModalType('none')}
          body={
            <PostForm
              variant="update"
              initialValues={{ body: 'some body', title: 'some title' }}
              author={user.name}
              onSubmit={() => {}}
            />
          }
        />
      </Page>
    </>
  )
}
