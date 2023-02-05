import { Flex, Text } from '@chakra-ui/layout'
import { ReactNode } from 'react'
import {
  HomeIcon,
  PowerIcon,
  SettingsIcon,
  UserGroupIcon,
} from '@/components/uiKit/Icons'
import { VStack } from '@/components/uiKit/VStack'
import { Link } from '../uiKit/Link'
import { useColorModeValue } from '@chakra-ui/react'

type TBottombarItem = {
  icon: ReactNode
  label: string
  isSelected?: boolean
  onClick?(): void
}

function BottombarItem(props: TBottombarItem) {
  return (
    <VStack
      as="button"
      alignItems="center"
      color={props.isSelected ? 'orange.600' : undefined}
      transition="color 250ms"
      cursor="pointer"
      _hover={{
        color: 'orange.600',
      }}
      onClick={props.onClick}
    >
      {props.icon}
      <Text fontSize="10px">{props.label}</Text>
    </VStack>
  )
}

type TNavItems = 'home' | 'users' | 'account' | 'logout'
type TBottombar = {
  selectedNav: TNavItems
  onLogout: () => void
}

export function Bottombar(props: TBottombar) {
  const boxShadowColor = useColorModeValue(
    'rgba(149, 157, 165, 0.2)',
    'rgba(149, 157, 165, 0.05)',
  )
  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      overflowX="scroll"
      padding="16px 20px"
      boxShadow={`${boxShadowColor} 6px 6px 60px`}
    >
      <Link href="/home" style={{ textDecoration: 'none' }}>
        <BottombarItem
          icon={<HomeIcon fontSize="20px" />}
          label="Home"
          isSelected={props.selectedNav === 'home'}
        />
      </Link>
      <Link href="/users" style={{ textDecoration: 'none' }}>
        <BottombarItem
          icon={<UserGroupIcon fontSize="20px" />}
          label="Users"
          isSelected={props.selectedNav === 'users'}
        />
      </Link>
      <Link href="/users" style={{ textDecoration: 'none' }}>
        <BottombarItem
          icon={<SettingsIcon fontSize="20px" />}
          label="My Account"
          isSelected={props.selectedNav === 'account'}
        />
      </Link>
      <BottombarItem
        onClick={props.onLogout}
        icon={<PowerIcon fontSize="20px" />}
        label="Logout"
        isSelected={props.selectedNav === 'logout'}
      />
    </Flex>
  )
}

export default Bottombar
