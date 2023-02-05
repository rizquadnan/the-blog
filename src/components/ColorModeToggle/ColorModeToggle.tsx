import { Flex, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@/components/uiKit/Icons'

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex justifyContent="flex-end" padding="24px" position="fixed" right="0">
      {colorMode === 'dark' ? (
        <IconButton
          aria-label="Change to light mode"
          icon={<SunIcon fontSize="20px" />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          aria-label="Change to dark mode"
          icon={<MoonIcon />}
          onClick={toggleColorMode}
        />
      )}
    </Flex>
  )
}
