import React, { ReactNode } from 'react'
import { Box, BoxProps, Flex } from '@chakra-ui/layout'

type TLoggedInLayout = {
  sideNav: ReactNode
  bottomNav: ReactNode
  children: ReactNode
  childrenContainerProps?: BoxProps
}

export function LoggedInLayout({
  childrenContainerProps = {},
  ...props
}: TLoggedInLayout) {
  return (
    <Flex minH="100vh">
      <Box
        w="240px"
        display={{ base: 'none', md: 'block' }}
        position="fixed"
        top={0}
        bottom={0}
        zIndex={2}
      >
        {props.sideNav}
      </Box>
      <Box
        flex="1"
        padding={{ base: '16px', md: '54px' }}
        paddingLeft={{ md: '262px' }}
        paddingBottom={{ base: '91px', md: '54px' }}
        maxW="100vw"
        {...childrenContainerProps}
      >
        {props.children}
      </Box>
      <Flex
        position="fixed"
        display={{ base: 'block', md: 'none' }}
        bottom={0}
        left={0}
        right={0}
        zIndex={2}
      >
        {props.bottomNav}
      </Flex>
    </Flex>
  )
}

export default LoggedInLayout
