import { TUser } from '@/api/users'
import { SearchIcon } from '@/components/uiKit/Icons'
import { Box, Flex, HStack, IconButton, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'

type TInputSearch = {
  onSearch: (searchBy: string, searchVal: string) => void
}

export function InputSearch(props: TInputSearch) {
  const [value, setValue] = useState('')
  const [searchBy, setSearchBy] = useState<keyof TUser>('name')

  return (
    <Flex w="100%">
      <Select
        placeholder="Search by"
        maxW="124px"
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value as keyof TUser)}
      >
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="id">ID</option>
        <option value="gender">Gender</option>
        <option value="status">Status</option>
      </Select>
      <Box position="relative" w="100%">
        <Input
          value={value}
          placeholder={`Search users by ${searchBy}`}
          onChange={(e) => setValue(e.target.value)}
          paddingRight="60px !important"
          w="100%"
        />
        <IconButton
          position="absolute"
          top="50%"
          right="12px"
          transform="translateY(-50%)"
          onClick={() => props.onSearch(searchBy, value)}
          variant="ghost"
          aria-label="Submit"
          colorScheme="orange"
          icon={<SearchIcon />}
          zIndex={2}
        />
      </Box>
    </Flex>
  )
}

export default InputSearch
