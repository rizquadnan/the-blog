import {
  Wrap,
  WrapItem as _WrapItem,
  WrapItemProps as _WrapItemProps,
} from '@chakra-ui/react'
import React from 'react'
import HomeIcon from './HomeIcon'
import MoonIcon from './MoonIcon'
import PowerIcon from './PowerIcon'
import SettingsIcon from './SettingsIcon'
import SunIcon from './SunIcon'
import UserGroupIcon from './UserGroupIcon'

function WrapItem(props: _WrapItemProps) {
  return (
    <_WrapItem
      border="1px solid"
      borderColor="gray.300"
      padding="12px"
      borderRadius="4px"
      {...props}
    />
  )
}

export function Icons() {
  return (
    <Wrap spacing="16px">
      <WrapItem>
        <SunIcon />
      </WrapItem>
      <WrapItem>
        <MoonIcon />
      </WrapItem>
      <WrapItem>
        <HomeIcon />
      </WrapItem>
      <WrapItem>
        <UserGroupIcon />
      </WrapItem>
      <WrapItem>
        <SettingsIcon />
      </WrapItem>
      <WrapItem>
        <PowerIcon />
      </WrapItem>
    </Wrap>
  )
}

export default Icons