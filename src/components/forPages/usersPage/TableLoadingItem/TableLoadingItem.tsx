import { SkeletonText, Td, Tr, useColorModeValue } from '@chakra-ui/react'

export function TableLoadingItem() {
  const skeletonBackground = useColorModeValue('black', 'white')

  return (
    <Tr>
      {Array(6)
        .fill('')
        .map((_, index) => (
          <Td key={index}>
            <SkeletonText
              noOfLines={1}
              w="100%"
              background={skeletonBackground}
            />
          </Td>
        ))}
    </Tr>
  )
}
