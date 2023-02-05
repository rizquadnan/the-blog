import React from 'react'
import { Container, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { VStack } from '@/components/uiKit/VStack'
import { Link } from '@/components/uiKit/Link'

type TLoginSwitch = {
  onClickGuestMode: () => void
  onClickAdmin: () => void
  onClickUser: () => void
}
export function LoginSwitch(props: TLoginSwitch) {
  return (
    <Container
      maxW="container.sm"
      borderColor="white"
      border="1px solid"
      borderRadius="4px"
      padding="32px"
    >
      <VStack textAlign="center" spacing="32px">
        <VStack spacing="4px">
          <Heading as="h1">Welcome to The Blog</Heading>
          <Text>
            You can tryout this app in guest mode! For complete features, login
            using admin account or a user account
          </Text>
        </VStack>
        <VStack w="100%">
          <Button w="100%" as={Link} href="/home" onClick={props.onClickAdmin}>
            Guest Mode
          </Button>
          <Button w="100%" as={Link} href="/home" onClick={props.onClickAdmin}>
            Login As Admin
          </Button>
          <Button w="100%" as={Link} href="/home" onClick={props.onClickUser}>
            Guest As User
          </Button>
        </VStack>
      </VStack>
    </Container>
  )
}

export default LoginSwitch
