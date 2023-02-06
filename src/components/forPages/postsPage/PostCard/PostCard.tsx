import { EditIcon } from '@/components/uiKit/Icons'
import { TVStack, VStack } from '@/components/uiKit/VStack'
import { Box, HStack, Text } from '@chakra-ui/layout'
import {
  IconButton,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react'
import Image, { ImageProps } from 'next/image'
import React from 'react'

// TODO: add cool hover effect
// TODO: optimize placeholder
// TODO: image distortion

type TPostCard = {
  title: string
  content: string
  author: string
  imageProps: ImageProps
  isLoading?: boolean
  onClickEdit?(): void
  onClickCard?(): void
} & TVStack
export function PostCard({
  title,
  content,
  author,
  imageProps,
  isLoading,
  onClickEdit,
  onClickCard,
  ...containerProps
}: TPostCard) {
  const editButtonBackground = useColorModeValue('white', 'black')

  return (
    <VStack
      w="100%"
      minW="300px"
      alignItems="flex-start"
      spacing="0px"
      {...containerProps}
      onClick={onClickCard}
      cursor="pointer"
    >
      <Box
        width="100%"
        height="200px"
        position="relative"
        borderTopLeftRadius="4px"
        borderTopRightRadius="4px"
        overflow="hidden"
      >
        {isLoading ? (
          <Skeleton w="100%" h="100%" />
        ) : (
          <>
            <Image {...imageProps} loading="lazy" fill alt={imageProps.alt} />
            <IconButton
              icon={<EditIcon />}
              aria-label="Edit Post"
              onClick={(e) => {
                e.stopPropagation()

                onClickEdit?.()
              }}
              position="absolute"
              top="8px"
              right="8px"
              borderRadius="100%"
              background={editButtonBackground}
            />
          </>
        )}
      </Box>

      <Box
        padding="14px 6px"
        border="1px solid"
        borderColor="gray.400"
        borderBottomLeftRadius="4px"
        borderBottomRightRadius="4px"
        w="100%"
      >
        <VStack spacing="2px">
          {isLoading ? (
            <SkeletonText noOfLines={2} />
          ) : (
            <Text noOfLines={2} fontSize="18px" fontWeight={600}>
              {title}
            </Text>
          )}
          <HStack>
            <Text as="span" fontWeight={600}>
              Author:{' '}
            </Text>{' '}
            {isLoading ? (
              <SkeletonText noOfLines={1} w="100%" maxW="100px" />
            ) : (
              <Text>{author}</Text>
            )}
          </HStack>
        </VStack>
        {isLoading ? (
          <SkeletonText noOfLines={3} />
        ) : (
          <Text noOfLines={3}>{content}</Text>
        )}
      </Box>
    </VStack>
  )
}

export default PostCard
