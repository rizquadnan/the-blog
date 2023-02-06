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
import { TPost, TUpdatePostPayload, usePosts } from '@/api/posts'
import PostCard from '@/components/forPages/postsPage/PostCard/PostCard'
import { PostForm } from '@/components/forPages/postsPage/PostForm'
import { normalizeUser, TUser } from '@/api/users'
import { MOCK_USER } from '@/mocks/auth'
import { useRouter } from 'next/router'
import { Link } from '@/components/uiKit/Link'
import { createPost } from '@/api/posts/createPost'
import { updatePost } from '@/api/posts/updatePost'

export default function Posts() {
  const [modalType, setModalType] = useState<'create' | 'update' | 'none'>(
    'none',
  )
  const [loadingType, setLoadingType] = useState<'create' | 'update' | 'none'>(
    'none',
  )

  const [user] = useState<TUser>(normalizeUser(MOCK_USER))

  const headerBackground = useColorModeValue('white', 'gray.800')

  const router = useRouter()

  const toast = useToast()

  const {
    posts,
    isLoading: isPostsLoading,
    pagination,
    refreshPosts,
  } = usePosts({
    perPage: 12,
    onErrorCallback: () => {
      toast({
        status: 'error',
        isClosable: true,
        title: 'Something went wrong',
        description: 'Please visit page later to try again',
      })
    },
  })

  const [initialUpdateValues, setInitialUpdateValues] = useState<
    Pick<TPost, 'body' | 'title' | 'id'>
  >({ body: '', title: '', id: 0 })

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
                    <PostCard
                      title={post.title}
                      content={post.body}
                      author={String(post.user_id)}
                      onClickEdit={() => {
                        setInitialUpdateValues({
                          body: post.body,
                          title: post.title,
                          id: post.id,
                        })
                        setModalType('update')
                      }}
                      onClickCard={() => router.push(`/posts/${post.id}`)}
                      imageProps={{
                        src: `https://picsum.photos/seed/${post.id}1000/1000`,
                        alt: `Thumbnail for Post: ${post.title}`,
                      }}
                    />
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
            <PostForm
              variant="create"
              author={user.name}
              isSubmitLoading={loadingType === 'create'}
              onSubmit={async (val) => {
                setLoadingType('create')
                try {
                  await createPost({ payload: { ...val, user_id: 290451 } })

                  toast({
                    status: 'success',
                    title: 'Success!',
                    description:
                      'Successfully created post, wait a moment until the post appear in this page',
                  })
                  setModalType('none')
                  refreshPosts()
                } catch (error) {
                  toast({
                    status: 'error',
                    isClosable: true,
                    title: 'Something went wrong',
                    description: 'Please visit page later to try again',
                  })
                } finally {
                  setLoadingType('none')
                }
              }}
            />
          }
        />
        <Modal
          title="Update Post"
          isOpen={modalType === 'update'}
          onClose={() => setModalType('none')}
          body={
            <PostForm
              variant="update"
              initialValues={initialUpdateValues}
              author={user.name}
              isSubmitLoading={loadingType === 'update'}
              onSubmit={async (val) => {
                setLoadingType('update')
                try {
                  await updatePost({
                    payload: val,
                    postId: initialUpdateValues.id,
                  })
                  toast({
                    status: 'success',
                    title: 'Success!',
                    description:
                      'Successfully updated post, wait a moment until the post appear in this page',
                  })
                  setModalType('none')
                  refreshPosts()
                } catch (error) {
                  toast({
                    status: 'error',
                    isClosable: true,
                    title: 'Something went wrong',
                    description: 'Please visit page later to try again',
                  })
                } finally {
                  setLoadingType('none')
                }
              }}
            />
          }
        />
      </Page>
    </>
  )
}
