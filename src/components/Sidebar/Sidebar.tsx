import React from 'react'
import { Flex, HStack } from '@chakra-ui/layout'
import { VStack } from '@/components/uiKit/VStack'
import { Link } from '@/components/uiKit/Link'
import {
  HomeIcon,
  PowerIcon,
  SettingsIcon,
  UserGroupIcon,
} from '@/components/uiKit/Icons'
import { Button, ButtonProps, useColorModeValue } from '@chakra-ui/react'
import { ColorModeToggle } from '@/components/ColorModeToggle'

type TNavItems = 'home' | 'users' | 'account' | 'logout'
type TSidebar = {
  selectedNav: TNavItems
  onLogout: () => void
  hideNav?: TNavItems
}

export function Sidebar(props: TSidebar) {
  const boxShadowColor = useColorModeValue(
    'rgba(149, 157, 165, 0.2)',
    'rgba(149, 157, 165, 0.05)',
  )

  const selectedNavStyles: Partial<ButtonProps> = {
    colorScheme: 'orange',
    variant: 'outline',
    opacity: 1,
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      minH="100vh"
      padding="32px 24px"
      w="fit-content"
      boxShadow={`${boxShadowColor} 0px 8px 12px`}
    >
      <VStack minW="160px">
        {props.hideNav === 'home' ? null : (
          <Button
            as={Link}
            href="/home"
            leftIcon={<HomeIcon fontSize="18px" />}
            variant="ghost"
            justifyContent="flex-start"
            {...(props.selectedNav === 'home' ? selectedNavStyles : {})}
          >
            Home
          </Button>
        )}
        {props.hideNav === 'users' ? null : (
          <Button
            as={Link}
            href="/users"
            leftIcon={<UserGroupIcon fontSize="18px" />}
            variant="ghost"
            justifyContent="flex-start"
            {...(props.selectedNav === 'users' ? selectedNavStyles : {})}
          >
            Users
          </Button>
        )}
      </VStack>
      <VStack>
        {props.hideNav === 'account' ? null : (
          <Button
            as={Link}
            href="/my-account"
            leftIcon={<SettingsIcon fontSize="18px" />}
            variant="ghost"
            justifyContent="flex-start"
          >
            My Account
          </Button>
        )}
        {props.hideNav === 'logout' ? null : (
          <Button
            leftIcon={<PowerIcon fontSize="18px" />}
            variant="ghost"
            justifyContent="flex-start"
            onClick={props.onLogout}
          >
            Logout
          </Button>
        )}
        <ColorModeToggle />
      </VStack>
    </Flex>
  )
}

export default Sidebar
