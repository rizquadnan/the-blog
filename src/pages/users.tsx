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
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react'
import { Modal } from '@/components/uiKit/Modal'
import { useState } from 'react'
import { normalizeUser, TUser } from '@/api/users'
import { MOCK_USERS } from '@/mocks/users'
import { UserForm } from '@/components/forPages/usersPage/UserForm'
import { EditIcon } from '@/components/uiKit/Icons'

export default function Home() {
  const [modalType, setModalType] = useState<'create' | 'update' | 'none'>(
    'none',
  )
  const [users, setUsers] = useState<TUser[]>(() =>
    MOCK_USERS.map((v) => normalizeUser(v)),
  )
  const [isUsersLoading, setIsUsersLoading] = useState(false)

  const headerBackground = useColorModeValue('white', 'gray.800')

  return (
    <>
      <Head>
        <title>{createPageTitle('Home')}</title>
      </Head>
      <Page>
        <LoggedInLayout
          sideNav={<Sidebar selectedNav="users" onLogout={() => {}} />}
          bottomNav={<Bottombar selectedNav="users" onLogout={() => {}} />}
        >
          <VStack>
            <Box position="sticky" top={0}>
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
                <TableCaption>
                  <Center>
                    <Button
                      w="100%"
                      variant="outline"
                      isLoading={isUsersLoading}
                      onClick={() => {
                        setIsUsersLoading(true)
                        setTimeout(() => {
                          setIsUsersLoading(false)
                          setUsers((prev) => {
                            return [
                              ...prev,
                              ...MOCK_USERS.map((user) => normalizeUser(user)),
                            ]
                          })
                        }, 2000)
                      }}
                    >
                      Load More
                    </Button>
                  </Center>
                </TableCaption>
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
                  {users.map((user) => (
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
          body={<UserForm variant="create" onSubmit={() => {}} />}
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
