import Page from '@/components/Page/Page'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/Bottombar'

export default function Home() {
  return (
    <>
      <Head>
        <title>{createPageTitle('Home')}</title>
      </Head>
      <Page>
        <LoggedInLayout
          sideNav={<Sidebar selectedNav="home" onLogout={() => {}} />}
          bottomNav={<Bottombar selectedNav="home" onLogout={() => {}} />}
        >
          <VStack>
            <Heading>Home</Heading>
          </VStack>
        </LoggedInLayout>
      </Page>
    </>
  )
}
