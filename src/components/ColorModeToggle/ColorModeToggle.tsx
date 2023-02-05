import { Button, Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@/components/uiKit/Icons'

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex onClick={toggleColorMode}>
      {colorMode === 'dark' ? (
        <>
          <IconButton
            variant="ghost"
            display={{ base: 'block', md: 'none' }}
            aria-label="Light mode"
            icon={<SunIcon fontSize="20px" />}
          />
          <Button
            variant="ghost"
            display={{ base: 'none', md: 'inline-flex' }}
            leftIcon={<SunIcon />}
          >
            Light mode
          </Button>
        </>
      ) : (
        <>
          <IconButton
            variant="ghost"
            display={{ base: 'block', md: 'none' }}
            aria-label="Dark mode"
            icon={<MoonIcon />}
          />
          <Button
            variant="ghost"
            display={{ base: 'none', md: 'inline-flex' }}
            leftIcon={<MoonIcon />}
          >
            Dark Mode
          </Button>
        </>
      )}
    </Flex>
  )
}
