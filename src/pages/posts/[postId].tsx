import Page from '@/components/Page/Page'
import { Box, BoxProps, Center, Heading, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/Bottombar'
import {
  Button,
  Skeleton,
  SkeletonText,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { usePost } from '@/api/posts'
import { createComment, TComment, useComments } from '@/api/comments'
import { MOCK_COMMENTS } from '@/mocks/comments'
import { PostComment } from '@/components/forPages/postPage/PostComment'
import { InputComment } from '@/components/forPages/postPage/InputComment'
import { ChevronIcon } from '@/components/uiKit/Icons'
import { Link } from '@/components/uiKit/Link'
import { Modal } from '@/components/uiKit/Modal'

export default function Home() {
  const [modalType, setModalType] = useState<'invalidPostId' | 'none'>('none')
  const [loadingType, setLoadingType] = useState<'createComment' | 'none'>(
    'none',
  )

  const skeletonColor = useColorModeValue('gray.500', 'white')
  const headerBackground = useColorModeValue('white', 'gray.800')
  const inputCommentBackground = useColorModeValue('white', 'gray.800')

  const router = useRouter()
  const postId = router.query.postId
  const validPostId = postId && Number(postId) > 0

  useEffect(() => {
    if (router.isReady && !validPostId) {
      setModalType('invalidPostId')
    }
  }, [router, router.isReady, validPostId])

  const pagePadding: Partial<BoxProps> = {
    px: { base: '16px', md: '0px' },
  }

  const toast = useToast()

  const { post, isLoading: isPostLoading } = usePost({
    postId: validPostId ? Number(postId) : null,
    onErrorCallback: () => {
      toast({
        status: 'error',
        isClosable: true,
        title: 'Something went wrong',
        description: 'Please visit page later to try again',
      })
    },
  })

  const {
    comments,
    isLoading: isCommentsLoading,
    refreshComments,
    pagination: commentsPagination,
  } = useComments({
    postId: validPostId ? Number(postId) : null,
    perPage: 2,
    onErrorCallback: () => {
      toast({
        status: 'error',
        isClosable: true,
        title: 'Something went wrong',
        description: 'Please visit page later to try again',
      })
    },
  })

  const isLoadingCommentsFirstTime = isCommentsLoading && comments.length === 0

  return (
    <>
      <Head>
        <title>
          {createPageTitle(
            validPostId && !isPostLoading ? `Post: ${post.title}` : 'Post',
          )}
        </title>
      </Head>
      <Page>
        <LoggedInLayout
          sideNav={
            <Sidebar selectedNav="post" onLogout={() => router.push('/')} />
          }
          bottomNav={
            <Bottombar selectedNav="post" onLogout={() => router.push('/')} />
          }
          childrenContainerProps={{
            px: '0px',
            maxW: '1200px',
            margin: { md: '0 auto' },
          }}
        >
          <VStack>
            <VStack spacing="32px">
              <VStack>
                <Box
                  position="sticky"
                  top={0}
                  background={headerBackground}
                  py="12px"
                  zIndex={2}
                  {...pagePadding}
                >
                  <Button
                    as={Link}
                    href="/posts"
                    leftIcon={<ChevronIcon />}
                    variant="link"
                    colorScheme="orange"
                  >
                    Kembali
                  </Button>
                </Box>

                <VStack>
                  <Box minH="130px">
                    {isPostLoading ? (
                      <SkeletonText
                        noOfLines={3}
                        skeletonHeight="38px"
                        startColor={skeletonColor}
                        endColor={skeletonColor}
                        fontSize="36px"
                      />
                    ) : (
                      <Heading as="h1" {...pagePadding} noOfLines={3}>
                        {post.title}
                      </Heading>
                    )}
                  </Box>
                  <Box
                    position="relative"
                    w="100%"
                    h={{ base: '300px', md: '460px' }}
                  >
                    <Image
                      src={`https://picsum.photos/seed/${postId}1000/1000`}
                      alt={`Post ${postId} thumbnail`}
                      fill
                    />
                  </Box>
                </VStack>
              </VStack>
              {isPostLoading ? (
                <SkeletonText
                  noOfLines={5}
                  startColor={skeletonColor}
                  endColor={skeletonColor}
                />
              ) : (
                <Text {...pagePadding}>{post.body}</Text>
              )}
            </VStack>
            <VStack mt="36px !important" spacing="20px" {...pagePadding}>
              <Box
                position="sticky"
                top={0}
                background={inputCommentBackground}
                zIndex={2}
                py="12px"
              >
                <InputComment
                  isLoading={loadingType === 'createComment'}
                  onSubmit={async (val) => {
                    setLoadingType('createComment')
                    try {
                      await createComment({
                        payload: {
                          name: 'The Blog User',
                          email: 'the.blog.user@theblog.com',
                          body: val,
                        },
                        postId: Number(postId),
                      })

                      refreshComments()
                      toast({
                        status: 'success',
                        isClosable: true,
                        title: 'Success!',
                        description:
                          'Successfully added comment, wait a moment until the comment appear in this page ',
                      })
                    } catch (error) {
                      toast({
                        status: 'error',
                        isClosable: true,
                        title: 'Failed to add comment',
                        description: 'Please visit page later to try again',
                      })
                    } finally {
                      setLoadingType('none')
                    }
                  }}
                  isDisabled={isPostLoading || isCommentsLoading}
                />
              </Box>
              <VStack>
                {isLoadingCommentsFirstTime ? (
                  <VStack>
                    <PostComment
                      author={{ name: '', email: '' }}
                      content=""
                      isLoading
                    />
                    <Skeleton
                      w="100%"
                      h="40px"
                      startColor={skeletonColor}
                      endColor={skeletonColor}
                    />
                  </VStack>
                ) : comments.length > 0 ? (
                  <>
                    <VStack spacing="24px">
                      {comments.map((comment) => (
                        <PostComment
                          key={comment.id}
                          author={{ name: comment.name, email: comment.email }}
                          content={comment.body}
                        />
                      ))}
                    </VStack>
                  </>
                ) : (
                  <Center mt="32px !important">
                    <Text>No Comments</Text>
                  </Center>
                )}
                {commentsPagination.hasMore && (
                  <Center mt="32px !important">
                    <Button
                      w="100%"
                      isLoading={isCommentsLoading}
                      onClick={() => commentsPagination.nextPage()}
                      variant="outline"
                      colorScheme="orange"
                    >
                      Load more
                    </Button>
                  </Center>
                )}
              </VStack>
            </VStack>
          </VStack>
        </LoggedInLayout>
      </Page>
      <Modal
        title="Invalid Post Id"
        isOpen={modalType === 'invalidPostId'}
        onClose={() => setModalType('none')}
        size="sm"
        isCentered
        closeable={false}
        body={
          <VStack>
            <Text>
              Post id is invalid. Please go back to previous page and load
              another post
            </Text>
            <Button as={Link} href="/posts">
              Go back
            </Button>
          </VStack>
        }
      />
    </>
  )
}
