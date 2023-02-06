import Page from '@/components/Page/Page'
import { Flex, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/BottomBar'
import { useColorModeValue } from '@chakra-ui/react'
import { useState } from 'react'
import { normalizeUser, TUser } from '@/api/users'
import { UserForm } from '@/components/forPages/usersPage/UserForm'
import { MOCK_USER } from '@/mocks/auth'
import { useRouter } from 'next/router'

export default function Home() {
  const headerBackground = useColorModeValue('white', 'transparent')
  const [user, setUser] = useState<TUser>(normalizeUser(MOCK_USER))

  const router = useRouter()

  return (
    <>
      <Head>
        <title>{createPageTitle('My Account')}</title>
      </Head>
      <Page>
        <LoggedInLayout
          sideNav={
            <Sidebar selectedNav="account" onLogout={() => router.push('/')} />
          }
          bottomNav={
            <Bottombar
              selectedNav="account"
              onLogout={() => router.push('/')}
            />
          }
        >
          <VStack>
            <Flex
              position="sticky"
              top={0}
              justifyContent="space-between"
              alignItems="center"
              background={headerBackground}
              py="12px"
            >
              <Heading>My Account</Heading>
            </Flex>

            <UserForm
              variant="update"
              initialValues={{
                email: user.email,
                gender: user.gender,
                name: user.name,
                status: user.status,
              }}
              onSubmit={() => {}}
            />
          </VStack>
        </LoggedInLayout>
      </Page>
    </>
  )
}
