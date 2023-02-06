import { SkeletonText, Td, Tr, useColorModeValue } from '@chakra-ui/react'

export function TableLoadingItem() {
  const skeletonBackground = useColorModeValue('gray.500', 'black')

  return (
    <Tr>
      {Array(6)
        .fill('')
        .map((_, index) => (
          <Td key={index}>
            <SkeletonText
              noOfLines={1}
              w="100%"
              startColor={skeletonBackground}
              endColor={skeletonBackground}
            />
          </Td>
        ))}
    </Tr>
  )
}
