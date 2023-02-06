import Page from '@/components/Page/Page'
import { Box, Center, Flex, Heading } from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/Bottombar'
import {
  Button,
  IconButton,
  SkeletonText,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Modal } from '@/components/uiKit/Modal'
import { useState } from 'react'
import { createUser, normalizeUser, useUsers } from '@/api/users'
import { UserForm } from '@/components/forPages/usersPage/UserForm'
import { EditIcon } from '@/components/uiKit/Icons'
import { useRouter } from 'next/router'
import { TableLoadingItem } from '@/components/forPages/usersPage/TableLoadingItem'

export default function Home() {
  const [modalType, setModalType] = useState<'create' | 'update' | 'none'>(
    'none',
  )
  const [loadingType, setLoadingType] = useState<'create' | 'update' | 'none'>(
    'none',
  )

  const headerBackground = useColorModeValue('white', 'gray.800')

  const router = useRouter()

  const toast = useToast()

  const {
    users,
    isLoading: isUsersLoading,
    pagination,
    refreshUsers,
  } = useUsers({
    perPage: 10,
    onErrorCallback: () =>
      toast({
        status: 'error',
        isClosable: true,
        title: 'Something went wrong',
        description: 'Please visit page later to try again',
      }),
  })

  return (
    <>
      <Head>
        <title>{createPageTitle('Users')}</title>
      </Head>
      <Page>
        <LoggedInLayout
          sideNav={
            <Sidebar selectedNav="users" onLogout={() => router.push('/')} />
          }
          bottomNav={
            <Bottombar selectedNav="users" onLogout={() => router.push('/')} />
          }
        >
          <VStack>
            <Box position="sticky" top={0} zIndex={2}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                background={headerBackground}
                py="12px"
              >
                <Heading>Users</Heading>
                <Button
                  variant="ghost"
                  colorScheme="orange"
                  onClick={() => setModalType('create')}
                >
                  Add User
                </Button>
              </Flex>
            </Box>

            <TableContainer>
              <Table variant="striped" colorScheme="orange">
                {pagination.hasMore && (
                  <TableCaption>
                    <Center>
                      <Button
                        w="100%"
                        variant="outline"
                        isLoading={isUsersLoading}
                        onClick={() => pagination.nextPage()}
                      >
                        Load More
                      </Button>
                    </Center>
                  </TableCaption>
                )}
                <Thead>
                  <Tr>
                    <Th>Action</Th>
                    <Th>User Id</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Gender</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isUsersLoading && users.length === 0
                    ? Array(4)
                        .fill('')
                        .map((_, index) => <TableLoadingItem key={index} />)
                    : users.map((user) => (
                        <Tr key={user.id}>
                          <Td>
                            <IconButton
                              icon={<EditIcon />}
                              variant="ghost"
                              aria-label="Edit Post"
                              onClick={() => setModalType('update')}
                            />
                          </Td>
                          <Td>{user.id}</Td>
                          <Td>{user.name}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.gender}</Td>
                          <Td>{user.status}</Td>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </LoggedInLayout>

        <Modal
          title="Create User"
          isOpen={modalType === 'create'}
          onClose={() => setModalType('none')}
          body={
            <UserForm
              variant="create"
              isLoading={loadingType === 'create'}
              onSubmit={async (val) => {
                setLoadingType('create')
                try {
                  await createUser({ payload: normalizeUser(val) })

                  toast({
                    status: 'success',
                    title: 'Success!',
                    description:
                      'Successfully updated post, wait a moment until the post appear in this page',
                  })
                  setModalType('none')
                  refreshUsers()
                } catch (error) {
                  toast({
                    status: 'error',
                    isClosable: true,
                    title: 'Failed to create user',
                    description: 'Please visit page later to try again',
                  })
                } finally {
                  setLoadingType('none')
                }
              }}
            />
          }
        />
        <Modal
          title="Update User"
          isOpen={modalType === 'update'}
          onClose={() => setModalType('none')}
          body={
            <UserForm
              variant="update"
              initialValues={{
                email: 'some@gmail.com',
                gender: 'female',
                name: 'some name',
                status: 'active',
              }}
              onSubmit={() => {}}
            />
          }
        />
      </Page>
    </>
  )
}
