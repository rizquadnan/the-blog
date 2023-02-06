import Page from '@/components/Page/Page'
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/layout'
import Head from 'next/head'
import { createPageTitle } from '@/utils/createPageTitle'
import { VStack } from '@/components/uiKit/VStack'
import { LoggedInLayout } from '@/components/LoggedInLayout'
import { Sidebar } from '@/components/Sidebar'
import { Bottombar } from '@/components/BottomBar'
import {
  Button,
  IconButton,
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
import {
  createUser,
  deleteUser,
  normalizeUser,
  TUser,
  updateUser,
  useUsers,
} from '@/api/users'
import { UserForm } from '@/components/forPages/usersPage/UserForm'
import { EditIcon, TrashIcon } from '@/components/uiKit/Icons'
import { useRouter } from 'next/router'
import { TableLoadingItem } from '@/components/forPages/usersPage/TableLoadingItem'
import { InputSearch } from '@/components/forPages/usersPage/InputSearch'

export default function Home() {
  const [modalType, setModalType] = useState<
    'create' | 'update' | 'delete' | 'none'
  >('none')
  const [loadingType, setLoadingType] = useState<
    'create' | 'update' | 'delete' | 'search' | 'none'
  >('none')

  const headerBackground = useColorModeValue('white', 'gray.800')

  const router = useRouter()

  const toast = useToast()

  const [searchValue, setSearchValue] = useState<Partial<TUser>>({})

  const {
    users,
    isLoading: isUsersLoading,
    pagination,
    refreshUsers,
  } = useUsers({
    searchParams: { ...searchValue },
    perPage: 10,
    onErrorCallback: () =>
      toast({
        status: 'error',
        isClosable: true,
        title: 'Something went wrong',
        description: 'Please visit page later to try again',
      }),
  })

  const [updateInitialValues, setUpdateInitialValues] = useState<TUser>({
    email: '',
    gender: 'male',
    status: 'inactive',
    id: 0,
    name: '',
  })
  const [idSelectedForDelete, setIdSelectedForDelete] = useState(0)

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
              <Stack
                direction={{ base: 'column', md: 'row' }}
                justifyContent="flex-start"
                alignItems={{ base: 'flex-start', md: 'center' }}
                background={headerBackground}
                py="12px"
                spacing="24px"
              >
                <Stack
                  w="100%"
                  direction={{ base: 'column', md: 'row' }}
                  spacing={{ base: '8px', md: '24px' }}
                  mr={{ md: 'auto' }}
                >
                  <Heading>Users</Heading>
                  <InputSearch
                    onSearch={async (searchBy, searchVal) => {
                      try {
                        setLoadingType('search')
                        setSearchValue({ [searchBy]: searchVal })
                        refreshUsers()
                      } catch (error) {
                        toast({
                          status: 'error',
                          isClosable: true,
                          title: 'Failed to search user',
                          description: 'Please visit page later to try again',
                        })
                      }
                    }}
                  />
                </Stack>
                <Button
                  variant="ghost"
                  colorScheme="orange"
                  onClick={() => setModalType('create')}
                >
                  Add User
                </Button>
              </Stack>
            </Box>

            <TableContainer>
              <Table variant="striped" colorScheme="orange">
                {pagination.hasMore && (
                  <TableCaption px="0px">
                    <Center>
                      <Button
                        w="100%"
                        variant="outline"
                        colorScheme="orange"
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
                            <HStack>
                              <IconButton
                                icon={<EditIcon />}
                                variant="ghost"
                                aria-label="Edit Post"
                                onClick={() => {
                                  setUpdateInitialValues(normalizeUser(user))
                                  setModalType('update')
                                }}
                              />
                              <IconButton
                                icon={<TrashIcon />}
                                variant="ghost"
                                aria-label="Delete Post"
                                onClick={() => {
                                  setIdSelectedForDelete(user.id)
                                  setModalType('delete')
                                }}
                              />
                            </HStack>
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
                      'Successfully created user, wait a moment until the user appear in this page',
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
                  setModalType('none')
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
                email: updateInitialValues.email,
                gender: updateInitialValues.gender,
                name: updateInitialValues.name,
                status: updateInitialValues.status,
              }}
              isLoading={loadingType === 'update'}
              onSubmit={async (val) => {
                setLoadingType('update')
                try {
                  await updateUser({
                    payload: { ...normalizeUser(val) },
                    userId: updateInitialValues.id,
                  })

                  toast({
                    status: 'success',
                    title: 'Success!',
                    description:
                      'Successfully updated user, wait a moment until the user appear in this page',
                  })
                  setModalType('none')
                  refreshUsers()
                } catch (error) {
                  toast({
                    status: 'error',
                    isClosable: true,
                    title: 'Failed to update user',
                    description: 'Please visit page later to try again',
                  })
                } finally {
                  setLoadingType('none')
                  setModalType('none')
                }
              }}
            />
          }
        />
        <Modal
          title="Delete User"
          isOpen={modalType === 'delete'}
          onClose={() => setModalType('none')}
          size="sm"
          isCentered
          body={
            <VStack spacing="32px">
              <Text>Are you sure ? You cant undo this action</Text>
              <HStack justifyContent="flex-end">
                <Button colorScheme="orange">Cancel</Button>
                <Button
                  onClick={async () => {
                    try {
                      setLoadingType('delete')

                      await deleteUser({ userId: idSelectedForDelete })

                      toast({
                        status: 'success',
                        title: 'Success!',
                        description:
                          'Successfully deleted user, wait a moment until the user disappear in this page',
                      })
                      setModalType('none')
                      refreshUsers()
                    } catch (error) {
                      toast({
                        status: 'error',
                        isClosable: true,
                        title: 'Failed to delete user',
                        description: 'Please visit page later to try again',
                      })
                    } finally {
                      setLoadingType('none')
                      setModalType('none')
                    }
                  }}
                >
                  Delete
                </Button>
              </HStack>
            </VStack>
          }
        />
      </Page>
    </>
  )
}
