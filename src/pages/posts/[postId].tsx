import Page from '@/components/Page/Page'
import { Box, BoxProps, Center, Heading, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/Bottombar'
import { Button, useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { MOCK_POSTS } from '@/mocks/posts'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { TPost } from '@/api/posts'
import { TComment } from '@/api/comments'
import { MOCK_COMMENTS } from '@/mocks/comments'
import { PostComment } from '@/components/forPages/postPage/PostComment'
import { InputComment } from '@/components/forPages/postPage/InputComment'
import { ChevronIcon } from '@/components/uiKit/Icons'
import { Link } from '@/components/uiKit/Link'

export default function Home() {
  const headerBackground = useColorModeValue('white', 'gray.800')
  const inputCommentBackground = useColorModeValue('white', 'gray.800')

  const router = useRouter()
  const postId = router.query.postId

  const [post, setPost] = useState<TPost>(MOCK_POSTS[0])

  const [comments, setComments] = useState<TComment[]>([])
  const [isCommentsLoading, setIsCommentsLoading] = useState(false)

  const pagePadding: Partial<BoxProps> = {
    px: { base: '16px', md: '0px' },
  }

  return (
    <>
      <Head>
        <title>{createPageTitle(`Post: ${post.title}`)}</title>
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
                  <Heading as="h1" {...pagePadding}>
                    {post.title}
                  </Heading>
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
              <Text {...pagePadding}>{post.body}</Text>
            </VStack>
            <VStack mt="48px !important" spacing="12px" {...pagePadding}>
              <Box
                position="sticky"
                top={0}
                background={inputCommentBackground}
                zIndex={2}
              >
                <InputComment onSubmit={() => {}} />
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
    </>
  )
}
