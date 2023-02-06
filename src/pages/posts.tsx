import Page from '@/components/Page/Page'
import { Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/Bottombar'
import { Button, useColorModeValue, useToast } from '@chakra-ui/react'
import { Modal } from '@/components/uiKit/Modal'
import { useState } from 'react'
import { TPost, usePosts } from '@/api/posts'
import { MOCK_POSTS } from '@/mocks/posts'
import PostCard from '@/components/forPages/postsPage/PostCard/PostCard'
import { PostForm } from '@/components/forPages/postsPage/PostForm'
import { normalizeUser, TUser } from '@/api/users'
import { MOCK_USER } from '@/mocks/auth'
import { useRouter } from 'next/router'
import { Link } from '@/components/uiKit/Link'

export default function Posts() {
  const [modalType, setModalType] = useState<'create' | 'update' | 'none'>(
    'none',
  )

  const [user] = useState<TUser>(normalizeUser(MOCK_USER))

  const headerBackground = useColorModeValue('white', 'gray.800')

  const router = useRouter()

  const toast = useToast()

  const { posts, isLoading: isPostsLoading, pagination } = usePosts({
    initialPage: 1,
    initialPerPage: 20,
    onErrorCallback: () => {
      toast({
        status: 'error',
        isClosable: true,
        title: 'Something went wrong',
        description: 'Please visit page later to try again',
      })
    },
  })

  const isLoadingPostFirstTime = isPostsLoading && posts.length === 0

  return (
    <>
      <Head>
        <title>{createPageTitle('Posts')}</title>
      </Head>
      <Page>
        <LoggedInLayout
          sideNav={
            <Sidebar selectedNav="post" onLogout={() => router.push('/')} />
          }
          bottomNav={
            <Bottombar selectedNav="post" onLogout={() => router.push('/')} />
          }
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
              <Heading>Posts</Heading>
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
              {isLoadingPostFirstTime ? (
                <>
                  <GridItem>
                    <PostCard
                      title=""
                      content=""
                      author=""
                      imageProps={{
                        src: '',
                        alt: '',
                      }}
                      isLoading
                    />
                  </GridItem>
                  <GridItem>
                    <PostCard
                      title=""
                      content=""
                      author=""
                      imageProps={{
                        src: '',
                        alt: '',
                      }}
                      isLoading
                    />
                  </GridItem>
                  <GridItem>
                    <PostCard
                      title=""
                      content=""
                      author=""
                      imageProps={{
                        src: '',
                        alt: '',
                      }}
                      isLoading
                    />
                  </GridItem>
                </>
              ) : (
                posts.map((post) => (
                  <GridItem key={post.id}>
                    <Link href={`/posts/${post.id}`}>
                      <PostCard
                        title={post.title}
                        content={post.body}
                        author={String(post.user_id)}
                        onClickEdit={() => setModalType('update')}
                        imageProps={{
                          src: `https://picsum.photos/seed/${post.id}1000/1000`,
                          alt: `Thumbnail for Post: ${post.title}`,
                        }}
                      />
                    </Link>
                  </GridItem>
                ))
              )}
            </Grid>

            {pagination.hasMore && (
              <Center mt="24px !important">
                <Button
                  variant="outline"
                  colorScheme="orange"
                  w="100%"
                  isLoading={isPostsLoading}
                  onClick={() => pagination.nextPage()}
                >
                  Load more
                </Button>
              </Center>
            )}
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
