import Page from '@/components/Page/Page'
import { Center, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import LoginForm from '@/components/LoginForm/LoginForm'
import { VStack } from '@/components/uiKit/VStack'
import { createPageTitle } from '@/utils/createPageTitle'

export default function Login() {
  return (
    <>
      <Head>
        <title>{createPageTitle('Login Admin')}</title>
      </Head>
      <Page>
        <Center minH="100vh">
          <VStack spacing="32px">
            <Heading as="h1">Login As Admin</Heading>
            <LoginForm onSubmit={() => {}} />
          </VStack>
        </Center>
      </Page>
    </>
  )
}
