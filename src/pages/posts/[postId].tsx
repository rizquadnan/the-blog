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
  SkeletonText,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { usePost } from '@/api/posts'
import { TComment } from '@/api/comments'
import { MOCK_COMMENTS } from '@/mocks/comments'
import { PostComment } from '@/components/forPages/postPage/PostComment'
import { InputComment } from '@/components/forPages/postPage/InputComment'
import { ChevronIcon } from '@/components/uiKit/Icons'
import { Link } from '@/components/uiKit/Link'
import { Modal } from '@/components/uiKit/Modal'

export default function Home() {
  const [modalType, setModalType] = useState<'invalidPostId' | 'none'>('none')

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

  const [comments, setComments] = useState<TComment[]>([])
  const [isCommentsLoading, setIsCommentsLoading] = useState(false)

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
                        startColor="white"
                        endColor="white"
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
                  startColor="white"
                  endColor="white"
                />
              ) : (
                <Text {...pagePadding}>{post.body}</Text>
              )}
            </VStack>
            <VStack mt="48px !important" spacing="12px" {...pagePadding}>
              <Box
                position="sticky"
                top={0}
                background={inputCommentBackground}
                zIndex={2}
              >
                <InputComment onSubmit={() => {}} isDisabled={!post} />
              </Box>
              {comments.length > 0 ? (
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
                  <Center>
                    <Button
                      w="100%"
                      isLoading={isCommentsLoading}
                      onClick={() => {
                        setIsCommentsLoading(true)
                        setTimeout(() => {
                          setIsCommentsLoading(false)
                          setComments((prev) => {
                            return [...prev, ...MOCK_COMMENTS]
                          })
                        }, 2000)
                      }}
                    >
                      Load more
                    </Button>
                  </Center>
                </>
              ) : (
                <Center mt="32px !important">
                  <Text>No Comments</Text>
                </Center>
              )}
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
