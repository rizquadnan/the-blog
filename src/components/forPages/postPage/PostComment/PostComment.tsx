import { VStack } from '@/components/uiKit/VStack'
import { SkeletonText, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

type TPostComment = {
  author: {
    name: string
    email: string
  }
  content: string
  isLoading?: boolean
}
export function PostComment(props: TPostComment) {
  const skeletonColor = useColorModeValue('gray.500', 'white')

  return (
    <VStack spacing="12px" minW="300px">
      <VStack spacing="4px">
        {props.isLoading ? (
          <SkeletonText
            startColor={skeletonColor}
            endColor={skeletonColor}
            noOfLines={1}
            fontSize="18px"
            maxW="100px"
          />
        ) : (
          <Text fontSize="16px" fontWeight={600}>
            {props.author.name}
          </Text>
        )}
        {props.isLoading ? (
          <SkeletonText
            startColor={skeletonColor}
            endColor={skeletonColor}
            noOfLines={1}
            fontSize="12px"
            maxW="120px"
          />
        ) : (
          <Text fontSize="12px" opacity={0.7}>
            {props.author.email}
          </Text>
        )}
      </VStack>

      {props.isLoading ? (
        <SkeletonText
          startColor={skeletonColor}
          endColor={skeletonColor}
          noOfLines={1}
        />
      ) : (
        <Text fontSize="14px">{props.content}</Text>
      )}
    </VStack>
  )
}

export default PostComment
